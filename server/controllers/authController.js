import bcrypt from 'bcryptjs'// to bcrypt the password
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import fs from 'fs';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Please provide all fields' })
    }
    
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: ' User already exists' });
        }
        let imageUrl='';

        if(req.files && req.files.image)
        {
            const file=req.files.image;
           if (!file.mimetype || !file.mimetype.startsWith('image/')) {
        return res.json({ success: false, message: 'Please upload a valid image file (e.g., JPEG, PNG)' });
      }

      // Upload to Cloudinary
      try {
        const result = await uploadToCloudinary(file.tempFilePath, {
          folder: 'Users',
        });
        imageUrl = result.url;
      } catch (uploadError) {
        return res.json({ success: false, message: uploadError });
      }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({ name, email, password: hashedPassword ,image:imageUrl})
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        //cookie to store the tokrn and send it to client
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',//secure only in production, runs on https
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',//sameSite only in development
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:'Welcome to INFOVERSE',
            text: `Welcome to INFOVERSE website. your account has been created with id:${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ success: true ,message:"user registered successfully"})
    }
    catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Email and password are required" })
    }
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, messge: "invalid Email" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, messge: "invalid Password" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        //cookie to store the tokrn and send it to client
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',//secure only in production, runs on https
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',//sameSite only in development
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true,message:"Logged In" })
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',//secure only in production, runs on https
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',//sameSite only in development
        })

        return res.json({success:true,message:"Logged Out"})
    }
    catch (err) {
        return res.json({ success: false, message: err.message })
    }

}

export const sendVerifyOtp= async(req,res)=>{
    try{
        const {userId}= req;

        const user = await userModel.findById(userId)

        if(user.isAccountVerified)
        {
            return res.json({success:false, message:"Account Already Verified"})
        }

        const otp = String(Math.floor(100000 +Math.random()*900000))

        user.verifyOtp= otp;
        user.verifyOtpExpireAt= Date.now() +24*60*60*1000

        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Account Verification OTP',
            //text: `your OTP is ${otp}. Verify your account using this OTP`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await transporter.sendMail(mailOptions);

        res.json({success:true, message:' Verificatyion OTP sent on Email'})
    }
    catch(err)
    {
        return res.json({success: false, message:err.message})
    }
}

export const verifyEmail = async(req,res)=>{
    const{userId} = req;
    const{otp} =req.body

    if(!otp)
    {
        return res.json({success:false, message :'missing details'})
    }
    try{
        const user = await userModel.findById(userId);
        if(!user)
        {
            return res.json({success:false,message:'User not found'});
        }

        if(user.verifyOtp==='' ||user.verifyOtp !== otp)
        {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.verifyOtpExpireAt<Date.now())
        {
            return res.json({success:false,message:'OTP Expired'});
        }

        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        
        await user.save();

        return res.json({success:true, message:'Email verified successfully'})

    }
    catch(err)
    {
        return res.json({success: false, message:err.message})
    }
}

export const isAuthenticated = async (req,res)=>{
    try{
        return res.json({success:true})
    }
   catch(err)
    {
        return res.json({success: false, message:err.message})
    }
}

//send passwordf reste OTP
export const sendResetOtp= async(req,res)=>{
    const {email}= req.body;

    if(!email)
    {
        return res.json({success:false, message:'Email is required'})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:'User not found'});
        }
        const otp = String(Math.floor(100000 +Math.random()*900000))

        user.resetOtp= otp;
        user.resetOtpExpireAt= Date.now() +15*60*1000;

        await user.save();

        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Password Reset OTP',
            //text: `your OTP for restting your password is ${otp}. Use this otp to rest your password`.
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await transporter.sendMail(mailOptions);
        return res.json({success:true, message:'Otp sent to your email'})
    }
    catch(err)
    {
        return res.json({success: false, message:err.message})
    }
}

//resetb user password
export const resetPassword = async(req,res)=>{
    const{email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword)
    {
        return res.json({success:false, message: 'Email,OTP, new Password are required'})
    }
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false , message:'User not found'})
        }

        if(user.resetOtp==="" || user.resetOtp!==otp)
        {
            return res.json({success:false, message:'Enter valid OTP'})
        }

        if(user.resetOtpExpireAt<Date.now())
        {
            return res.json({success:false, message: "OTP Expired"})
        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password= hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;

        await user.save();

        return res.json({success:true, message:'Password has been reset successfully'})
    }
    catch(err){
         return res.json({success: false, message:err.message})
    }
}
