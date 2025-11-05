import  Session  from "../models/Session.js";
import { chatClient, streamClient } from "../lib/stream.js";

export async function createSession(req, res) {
    // Implementation for creating a session
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user.id; // Assuming req.user is populated by protectRoute middleware
        const clerkId = req.user.clerkId;

        if (!problem || !difficulty) {
            return res.status(400).json({ message: 'Problem and difficulty are required.' });
        }

        const callId = `call_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId: callId
        });
        //create stream vcall
        await streamClient.video.call("default", callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom: {problem,difficulty,sessionId:session._id.toString()}

            }
        });
        //chat massage channel can be created here too
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        })
        await channel.create();

        res.status(201).json({ session });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getActiveSessions(_, res) {
    // Implementation for getting active sessions
    try {
        const sessions = await (await Session.find({ status: 'active' }).populate('host', 'name profileImage email clerkId')).toSort({ createdAt: -1 }).limit(20).populate('participant', 'name email');
        res.status(200).json({ sessions });
    } catch (error) {
        console.error('Error fetching active sessions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getMyRecentSessions(req, res) {
    // Implementation for getting user's recent sessions
    try {
        const userId = req.user.id; // Assuming req.user is populated by protectRoute middleware
        const sessions = await Session.find({
            status: 'Completed',
            $or: [{ host: userId }, { participant: userId }]
        }).sort({ createdAt: -1 }).limit(20);
        res.status(200).json({ sessions });
    } catch (error) {
        console.error('Error fetching recent sessions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   
export async function getSessionById(req, res) {
    // Implementation for getting a session by ID
    try {
        const { id } = req.params;
        const session = await Session.findById(id).populate('host', 'name email profileImage clerkId').populate('participant', 'name email profileImage clerkId');
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ session });
    } catch (error) {
        console.error('Error fetching session by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   

export async function joinASession(req, res) {
    // Implementation for joining a session
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming req.user is populated by protectRoute middleware
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        if (session.participant) {
            return res.status(404).json({ message: 'Session already has a participant' });
        }

        session.participant = userId;
        await session.save();

        //add user to stream video call
        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({ session });
    } catch (error) {
        console.error('Error joining session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}   
export async function endSession(req, res) {
    // Implementation for ending a session
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assuming req.user is populated by protectRoute middleware
        const session = await Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        //check if the user is the host
        if (session.host.toString() !== userId) {
            return res.status(403).json({ message: 'Only the host can end the session' });
        }
        //check if session is already completed
        if (session.status === 'Completed') {
            return res.status(400).json({ message: 'Session is already completed' });
        }
        session.status = 'Completed';
        await session.save();

        //delete stream video call
        await streamClient.video.call("default", session.callId).delete({hard:true});

        await chatClient.channel("messaging", session.callId).delete({hard:true});

        res.status(200).json({ session,message: 'Session ended successfully' });

    } catch (error) {
        console.error('Error ending session:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}