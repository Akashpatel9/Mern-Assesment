import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        // Extract token from authorization header
        const token = req.headers.authorization.split(' ')[1];
        

        // Check if the token is present
        if (!token) {
            return res.status(401).json({
                message: "Token not found",
                success: false,
            });
        }

        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: error,
            success: false,
        });
    }
};
