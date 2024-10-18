import User from "../models/User.js";
import cloudinary from "../config/cloudinaryconfig.js";
export const uploadAvatar = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        public_id: `${user_id}`,
      });
      user.avatar = result.secure_url;
      await user.save();
    }
    catch(error) {
      console.log(error);
    }
    res.status(200).json({ message: "Avatar uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
};
