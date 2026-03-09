const { User, Token } = require('../models');
const { generateToken, generateRefreshToken } = require('../utils/token');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const { Op } = require('sequelize');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ where: { [Op.or]: [{ email }, { username }] } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const profileImage = req.file ? req.file.path : null;

        const user = await User.create({
            username,
            email,
            password,
            profileImage
        });

        // Email verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        await Token.create({
            userId: user.id,
            token: verificationToken,
            type: 'verification',
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;

        // Simulate email send (log to console if SMTP not configured)
        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message: `Click here to verify: ${verificationUrl}`,
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
        });

        res.status(201).json({
            message: 'User registered. Please check your email to verify.',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }

        const token = generateToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        // Save refresh token
        await Token.create({
            userId: user.id,
            token: refreshToken,
            type: 'refresh',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.json({
            token,
            refreshToken,
            user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const tokenRecord = await Token.findOne({ where: { token, type: 'verification', expiresAt: { [Op.gt]: new Date() } } });

        if (!tokenRecord) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await User.update({ isVerified: true }, { where: { id: tokenRecord.userId } });
        await tokenRecord.destroy();

        res.json({ message: 'Email verified successfully. You can now login.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        await Token.create({
            userId: user.id,
            token: resetToken,
            type: 'reset',
            expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour
        });

        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Request',
            message: `Click here to reset your password: ${resetUrl}`,
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
        });

        res.json({ message: 'Password reset link sent to email' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const tokenRecord = await Token.findOne({
            where: { token, type: 'reset', expiresAt: { [Op.gt]: new Date() } }
        });

        if (!tokenRecord) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const user = await User.findByPk(tokenRecord.userId);
        user.password = password;
        await user.save();

        await tokenRecord.destroy();

        res.json({ message: 'Password reset successful. You can now login.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }

        const tokenRecord = await Token.findOne({
            where: { token: refreshToken, type: 'refresh', expiresAt: { [Op.gt]: new Date() } }
        });

        if (!tokenRecord) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const newToken = generateToken(tokenRecord.userId);
        res.json({ token: newToken });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
