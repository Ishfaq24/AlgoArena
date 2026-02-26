import User from '../models/User.js';
import Session from '../models/Session.js';

export async function getDashboardData(req, res) {
  try {
    const userId = req.user._id;
    
    // Get or create user stats
    let user = await User.findById(userId).select('-activities');
    
    if (!user) {
      // Create new user if not exists
      user = await User.create({
        _id: userId,
        email: req.user.email,
        clerkId: req.user.clerkId,
        username: req.user.username || req.user.email?.split('@')[0],
        profileImage: req.user.imageUrl || '',
      });
    }

    // Get recent sessions for the user
    const recentSessions = await Session.find({
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('host', 'name profileImage')
      .populate('participant', 'name profileImage');

    // Get active sessions
    const activeSessions = await Session.find({
      status: 'active',
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('host', 'name profileImage')
      .populate('participant', 'name profileImage');

    // Calculate study hours from sessions (if not already tracked)
    const completedSessions = await Session.find({
      $or: [{ host: userId }, { participant: userId }],
      status: 'completed',
    });

    // Update streak based on activity
    const now = new Date();
    const lastActive = user.stats.lastActiveDate;
    let streak = user.stats.streak;
    
    if (lastActive) {
      const daysDiff = Math.floor((now - new Date(lastActive)) / (1000 * 60 * 60 * 24));
      if (daysDiff > 1) {
        streak = 0;
      } else if (daysDiff === 1) {
        streak += 1;
      }
    } else {
      streak = 1;
    }

    // Update last active date
    await User.findByIdAndUpdate(userId, {
      'stats.lastActiveDate': now,
      'stats.streak': streak,
      'stats.totalSessions': completedSessions.length,
    });

    // Calculate goals met percentage
    const goals = user.goals;
    const studyHoursProgress = goals.studyHours.current / goals.studyHours.target * 100;
    const lessonsProgress = goals.lessons.current / goals.lessons.target * 100;
    const quizzesProgress = (goals.quizzes || 0) / (goals.quizzes?.target || 1) * 100;
    const assignmentsProgress = goals.assignments.current / goals.assignments.target * 100;
    const goalsMet = Math.round((studyHoursProgress + lessonsProgress + quizzesProgress + assignmentsProgress) / 4);

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        clerkId: user.clerkId,
      },
      stats: {
        studyHours: user.stats.studyHours || Math.round(completedSessions.length * 1.5), // Estimate 1.5 hours per session
        streak: streak,
        goalsMet: goalsMet,
        achievements: user.stats.achievements || 0,
        totalSessions: completedSessions.length,
        aiSummaries: user.stats.aiSummaries || 0,
        examReadiness: user.stats.examReadiness || 0,
        conceptClarity: user.stats.conceptClarity || 0,
        activeRetention: user.stats.activeRetention || 0,
      },
      goals: {
        studyHours: [goals.studyHours.current, goals.studyHours.target],
        lessons: [goals.lessons.current, goals.lessons.target],
        quizzes: [goals.quizzes || 0, goals.quizzes?.target || 15],
        assignments: [goals.assignments.current, goals.assignments.target],
      },
      recentSessions: recentSessions.map(s => ({
        id: s._id,
        problem: s.problem,
        difficulty: s.difficulty,
        status: s.status,
        createdAt: s.createdAt,
        host: s.host,
        participant: s.participant,
      })),
      activeSessions: activeSessions.map(s => ({
        id: s._id,
        problem: s.problem,
        difficulty: s.difficulty,
        status: s.status,
        createdAt: s.createdAt,
        host: s.host,
        participant: s.participant,
      })),
      activities: user.activities?.slice(0, 10) || [],
    });
  } catch (error) {
    console.log("Error in getDashboardData controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateStats(req, res) {
  try {
    const userId = req.user._id;
    const { stats } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { stats: { ...req.user.stats, ...stats } },
      { new: true }
    ).select('stats');

    res.status(200).json({ stats: updatedUser.stats });
  } catch (error) {
    console.log("Error in updateStats controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addActivity(req, res) {
  try {
    const userId = req.user._id;
    const { action, target, icon } = req.body;

    const activity = {
      action,
      target,
      icon,
      time: new Date(),
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { activities: { $each: [activity], $position: 0, $slice: 20 } } },
      { new: true }
    ).select('activities');

    res.status(200).json({ activities: user.activities });
  } catch (error) {
    console.log("Error in addActivity controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateGoals(req, res) {
  try {
    const userId = req.user._id;
    const { goals } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { goals },
      { new: true }
    ).select('goals');

    res.status(200).json({ goals: updatedUser.goals });
  } catch (error) {
    console.log("Error in updateGoals controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}