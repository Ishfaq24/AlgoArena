import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
        default: '',
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    // Dashboard stats
    stats: {
        studyHours: {
            type: Number,
            default: 0
        },
        streak: {
            type: Number,
            default: 0
        },
        lastActiveDate: {
            type: Date,
            default: null
        },
        goalsMet: {
            type: Number,
            default: 0
        },
        achievements: {
            type: Number,
            default: 0
        },
        totalSessions: {
            type: Number,
            default: 0
        },
        completedSessions: {
            type: Number,
            default: 0
        },
        aiSummaries: {
            type: Number,
            default: 0
        },
        examReadiness: {
            type: Number,
            default: 0
        },
        conceptClarity: {
            type: Number,
            default: 0
        },
        activeRetention: {
            type: Number,
            default: 0
        },
    },
    // Monthly goals
    goals: {
        studyHours: { current: { type: Number, default: 0 }, target: { type: Number, default: 60 } },
        lessons: { current: { type: Number, default: 0 }, target: { type: Number, default: 30 } },
        quizzes: { current: { type: Number, default: 0 }, target: { type: Number, default: 15 } },
        assignments: { current: { type: Number, default: 0 }, target: { type: Number, default: 10 } },
    },
    // Activity tracking
    activities: [{
        action: String,
        target: String,
        time: Date,
        icon: String,
    }],
}, { timestamps: true });
  
const User = mongoose.model('User', userSchema);


export default User;
