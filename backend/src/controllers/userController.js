const { User } = require('../models');
const redis = require('../config/redis');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findByPk(req.user.id);

        if (req.file) {
            // Delete old image if it exists
            if (user.profileImage && fs.existsSync(user.profileImage)) {
                fs.unlinkSync(user.profileImage);
            }
            user.profileImage = req.file.path;
        }
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        // Clear cache
        await redis.del('users_list_*');

        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const offset = (page - 1) * limit;

        const cacheKey = `users_list_p${page}_l${limit}_s${search}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cachedData));
        }

        const { count, rows } = await User.findAndCountAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            },
            attributes: { exclude: ['password'] },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['createdAt', 'DESC']]
        });

        const response = {
            users: rows,
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        };

        // Cache for 5 minutes
        await redis.setEx(cacheKey, 300, JSON.stringify(response));

        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete profile image if exists
        if (user.profileImage && fs.existsSync(user.profileImage)) {
            fs.unlinkSync(user.profileImage);
        }

        await user.destroy();
        await redis.del('users_list_*');

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeProfileImage = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (user.profileImage && fs.existsSync(user.profileImage)) {
            fs.unlinkSync(user.profileImage);
        }
        user.profileImage = null;
        await user.save();
        res.json({ message: 'Profile image removed', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
