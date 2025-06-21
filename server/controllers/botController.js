import botModel from "../models/botModel.js";
import userModel from "../models/userModel.js";

export const getChats = async (req, res) => {
    try {
        const { userId } = req;
        // const { chatId } = req.params;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const email = user.email;
        let botChats = await botModel.findOne({ "user.email": email });
        if (!botChats) {
            const defaultChat = {
                name: "Default Chat",
                chats: []
            };

            const newBot = new botModel({
                user: {
                    username: user.name,
                    email: email
                },
                allChats: [defaultChat]
            });

            botChats = await newBot.save();
        }
        // if (!chatId || chatId === '0') {
        //     let defaultChat = botChats.allChats.find(chat => chat.name === "Default Chat");
        //     if (!defaultChat) {
        //         defaultChat = {
        //             name: "Default Chat",
        //             chats: []
        //         };
        //         botChats.allChats.push(defaultChat);
        //         await botChats.save();
        //         defaultChat = botChats.allChats.find(chat => chat.name === "Default Chat");
        //     }
        //     return res.json({ success: true, data: defaultChat });
        // }
        // const chat = botChats.allChats.id(chatId);
        // if (!chat) {
        //     return res.json({ success: false, message: "Chat not found" });
        // }
        return res.json({ success: true, data: botChats });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};
// export const getChatsById=async(req,res)=>{
//     try{
//         const {userId}=req;
//         const user=userModel.findById(userId);
//         const {chatId} = req.params;
//         if(!user)
//         {
//             return res.json({success:false,message:"User not found"});
//         }
//         const botChat= botModel.findOne({"user.email":user.email});
//         if(!botChat)
//         {
//             return res.json({success:false,})
//         }
//     }
//     catch(err){
//         return res.json({success:false,message:err.message});
//     }
// }
//for creation of a new chat which will contain sef of chats
export const createChat = async (req, res) => {
    try {
        const { userId } = req;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const { name } = req.body;
        let botChat = await botModel.findOne({ "user.email": user.email });
        if (!botChat) {
            return res.json({ success: false, message: "Chat not found" });
        }
        if (botChat.allChats.find((e) => (e.name === name))) {
            return res.json({ success: false, message: "You already have a chat with this name" });
        }
        const newChat = {
            name,
            chats: []
        }
        botChat.allChats.push(newChat);
        await botChat.save();
        return res.json({ success: true, message: "New chat created successfully" });
    }
    catch (err) {
        return res.json({ success: false, message: err.message });
    }
}
export const addChat = async (req, res) => {
    try {
        const { userId } = req;
        const { chatId } = req.params;
        const { userReq, botRes, fileUri, mimeType } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        let botChat = await botModel.findOne({ "user.email": user.email });
        if (!botChat) {
            return res.json({ success: false, message: "Chat not found" });
        }
        let userChat;
        if (fileUri && mimeType) {
            userChat = {
                role: "user",
                parts: [{
                    text: userReq,
                    fileData: {
                        fileUri: fileUri,
                        mimeType: mimeType
                    }
                }]
            };
        } else {
            userChat = {
                role: "user",
                parts: [{
                    text: userReq
                }]
            };
        }
        const modelChat = {
            role: "model",
            parts: [{
                text: botRes
            }]
        };
        let chats = botChat.allChats.find((e) => e._id.toString() === chatId);
        if (!chats) {
            return res.status(404).json({ success: false, message: "Chat with given ID not found" });
        }
        chats.chats.push(userChat);
        chats.chats.push(modelChat);
        await botChat.save();
        return res.json({ success: true, message: "Chats saved successfully" });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};
export const deleteChat= async(req,res)=>{
    try{
        const {userId}=req;
        const user = await userModel.findById(userId);
        if(!user)
        {
            return res.json({success:false,message:"User not found"});
        }
        const {name}=req.query;
        const botChat = await botModel.findOne({"user.email":user.email});
        if(!botChat)
        {
            return res.json({success:false,message:"You don't have any chats"});
        }
        const originalLength= botChat.allChats.length;
        botChat.allChats= botChat.allChats.filter(chat => name!=chat.name);
        if(originalLength===botChat.allChats.length)
        {
            return res.json({success:false,message:"Chat not found"})
        }
        await botChat.save();
        return res.json({success:true,message:"Chat deleted successfully"});
    }
    catch(err)
    {
        return res.json({success:false,message:err.message})
    }
}

