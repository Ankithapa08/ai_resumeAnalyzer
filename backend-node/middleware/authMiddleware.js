const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // Get token from headers
        const token = req.header("Authorization");

        if (!token) {

            return res.status(401).json({
                error: "Access denied"
            });
        }

        // Verify token
        const verified = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store user info
        req.user = verified;

        next();

    } catch (error) {

        res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = authMiddleware;