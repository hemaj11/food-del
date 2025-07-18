import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    // Accept token from 'authorization' header as 'Bearer <token>'
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (req.headers.token) {
        token = req.headers.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided, authorization denied."
        });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Token is not valid."
        });
    }
}

export default authMiddleware;