import bcrypt from "bcryptjs";
import User from '../modals/userModel.js';

const updateUser = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        // 1. Hubi username iyo email
        if (!username || !email) {
            return res.status(400).json({
                message: "Please provide username and email",
            });
        }

        // 2. Hubi in user-ku yahay qofka profile-ka leh
        if (req.user.id!== req.params.id) {
            return res.status(403).json({
                message: "You are not authorized to update this profile",
            });
        }

        // 3. User-ka database-ka ka raadi
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // 4. Xogta update-ka diyaarso
        const updateData = {
            username,
            email,
            avatar,
        };

        // 5. Haddii password cusub la soo diray, hash garee
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        // 6. User-ka update garee
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true}
        ).select("-password");

        // 7. Response
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: updatedUser,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message
        });
    }
};

export default updateUser;