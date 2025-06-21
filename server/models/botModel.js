import mongoose from "mongoose";

// First define chatSchema
const chatSchema = new mongoose.Schema({
    role: { type: String, required: true },
    parts: [{
        text: { type: String, required: true },
        fileData: { fileUri: {type:String},
      mimeType: {type:String}}
    }]
}, { _id: false });

const allChatsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chats: [chatSchema],
    createdAt: { type: Date, default: Date.now }
});

const botSchema = new mongoose.Schema({
    user: {
        username: { type: String, required: true },
        email: { type: String, required: true },
    },
    allChats: [allChatsSchema],
    createdAt: { type: Date, default: Date.now }
});

const botModel = mongoose.models.botChats || mongoose.model('botChats', botSchema);

export default botModel;
