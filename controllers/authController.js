const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
    const {username, password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashPassword,
        });
        req.session.user = user;
        res.json({
            status: 'success',
            user,
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message,
        });
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});

        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'user not found',
            });
        } else {
            const isCorrect = await bcrypt.compare(password, user.password);

            if (isCorrect) {
                req.session.user = user;
                res.json({
                    status: 'success',
                    user,
                });
            } else {
                res.status(404).json({
                    status: 'fail',
                    message: 'incorrect username or password',
                });
            }
        }
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e.message,
        });
    }
};
