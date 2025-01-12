import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        index: true
    },
    password_hash: { type: String, required: true },
    bio: { type: String },
    avatar_url: { type: String, default: 'none' },
    role: { type: String, enum: ['admin', 'author', 'user'], default: 'user' },
    locked: { type: Boolean, default: false },
    subscribed: { type: Boolean, default: false }, 

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date }
});

// Cập nhật trường `updated_at` khi mật khẩu được thay đổi
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password_hash')) return next();
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;