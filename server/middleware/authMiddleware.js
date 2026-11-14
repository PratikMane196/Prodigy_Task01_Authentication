import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key");

            // Attach user info to request object
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Not authorized, token failed." });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token provided." });
    }
};