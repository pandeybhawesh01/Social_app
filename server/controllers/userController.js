import userModel from "../models/userModel.js";
// import { uploadToCloudinary } from "../config/cloudinary.js";
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
export const getUserByEmail= async(req,res)=>{
  try{
  const {email} =req.params;
  const user = await userModel.findOne({email}) ;
  if(!user)
  {
    return res.json({success:false, message:"user not found"});
  }
  return res.json({success:true,userData:{
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
catch(err)
{
  res.json({success:false,message:err.message});
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
      banner,
      image,
    } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (name != null)     user.name     = name;
    if (bio != null)      user.bio      = bio;
    if (website != null)  user.website  = website;
    if (location != null) user.location = location;
    if (image != null)    user.image    = image;
    if (banner != null)   user.banner   = banner;
    

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