const protect = (req, res, next) => {
    const {user} = req.session;

    if (!user) {
        return res.status(401).js({
            status: 'fail',
            message: 'unauthorized',
        });
    }

    req.user = user;

    next();
};

module.exports = protect;
