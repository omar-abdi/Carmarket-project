import jwt from "jsonwebtoken"
import User from "../models/User.js"
export const protectRoute = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "You are not authorized to access this route" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "You are not authorized to access this route" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: "You are not authorized to access this route" })
    }
}