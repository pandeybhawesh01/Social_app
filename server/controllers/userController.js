import userModel from "../models/userModel.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
export const getUserData = async(req,res)=>{
    try{
        const {userId} =req;

        const user= await userModel.findById(userId);

        if(!user){
            return res.json({success:false,message:'User not found'})
        }

        return res.json({success:true, userData:{
            name:user.name,
            email:user.email,
            isAccountVerified:user.isAccountVerified,
            bio: user.bio,
            website:user.website,
            location: user.location,
            image: user.image,
            banner:user.banner,
        }})
    }
    catch(error){
        return res.json({success: false,message:error.message})
    }
}
export const updateUser = async (req, res) => {
  try {
    const { userId } = req;
    const {
      name,
      bio,
      website,
      location,
    } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name != null)     user.name     = name;
    if (bio != null)      user.bio      = bio;
    if (website != null)  user.website  = website;
    if (location != null) user.location = location;

    if (req.files && req.files.image) {
      const file = req.files.image;
      if (!file.mimetype.startsWith("image/")) {
        return res.json({
          success: false,
          message: "Please upload a valid image for avatar",
        });
      }
      const result = await uploadToCloudinary(file.tempFilePath, {
        folder: "Users/Avatars",
      });
      user.image = result.url;
    }

    if (req.files && req.files.banner) {
      const file = req.files.banner;
      if (!file.mimetype.startsWith("image/")) {
        return res.json({
          success: false,
          message: "Please upload a valid image for banner",
        });
      }
      const result = await uploadToCloudinary(file.tempFilePath, {
        folder: "Users/Banners",
      });
      user.banner = result.url;
    }

    await user.save();
    return res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        bio: user.bio,
        website: user.website,
        location: user.location,
        image: user.image,
        banner: user.banner,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};