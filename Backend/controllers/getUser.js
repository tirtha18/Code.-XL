import User from "../models/User.js";
export const getUser = async (req, res) => {
    try{
        const user_id = req.query.user_id;
        if(!user_id)
            return res.status(400).json({"message": "No User ID found"});
        const user =await User.findById(user_id);
        if(!user)
            return res.status(404).json({"message": "No valid user found"});
        res.json(user);
    }
    catch(error)
    {
        console.log(error);
    }
}