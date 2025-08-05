import React, { useState, useRef, useEffect, useContext } from 'react';
import { Input, InputAdornment } from '@mui/material';
import NorthIcon from '@mui/icons-material/ArrowUpward';
import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';
import Markdown from 'react-markdown';
import { assets } from '../assets/assets';
import { AppContext } from '../contex/AppContex';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import axios from 'axios';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useBotViewModel from '../viewModels/BotViewModel';
import ChatShimmer from '../coponents/botShimmer';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Loader = () => (
    <div className="loader border-4 border-white border-t-transparent rounded-full w-6 h-6 animate-spin mx-auto"></div>
);

const Bot = () => {
    const { userData, backendUrl } = useContext(AppContext);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [newChatName, setNewChatName] = useState('');
    const [showChatInput, setShowChatInput] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const { loading: viewLoading, error, getChat, deleteChat, createChat, getChatLoading } = useBotViewModel();

    const ai = new GoogleGenAI({ apiKey: 'AIzaSyCgSq32mZyKE8BS-y8U64cLG34KU001Tho' });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleImageClick = () => fileInputRef.current?.click();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedImage(file);
    };

    const handleInputChange = (event) => setMessage(event.target.value);

    const getresponse = async (inputMessage) => {
        if (!inputMessage.trim() || !selectedChatId) return;
        setLoading(true);
        let imagePreviewUrl = null;

        try {
            let content;
            let fileUri, mimeType;

            if (selectedImage) {
                const uploadedImage = await ai.files.upload({ file: selectedImage });
                content = createUserContent([
                    inputMessage,
                    createPartFromUri(uploadedImage.uri, uploadedImage.mimeType),
                ]);
                fileUri = uploadedImage.uri;
                mimeType = uploadedImage.mimeType;
                imagePreviewUrl = URL.createObjectURL(selectedImage);
            } else {
                content = inputMessage;
            }

            const chatInstance = await ai.chats.create({
                model: 'gemini-2.0-flash',
                history: chatHistory,
            });

            const response = await chatInstance.sendMessage({ message: content });

            const newUserPart = selectedImage
                ? [{ text: inputMessage, fileData: { fileUri, mimeType } }]
                : [{ text: inputMessage }];

            const newBotPart = [{ text: response.text }];

            setChatHistory((prev) => [
                ...prev,
                { role: 'user', parts: newUserPart },
                { role: 'model', parts: newBotPart },
            ]);

            setMessage('');
            setSelectedImage(null);

            await axios.post(`${backendUrl}/api/bot/addChat/${selectedChatId}`, {
                userReq: inputMessage,
                botRes: response.text,
                ...(fileUri && mimeType ? { fileUri, mimeType } : {}),
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const onClickChat = (index) => {
        setSelectedChatId(chat[index]._id);
        setChatHistory(chat[index].chats);
    };

    const createChats = async () => {
        if (!newChatName.trim()) return toast.warn("Please enter a chat name");

        try {
            const data = await createChat(newChatName);
            console.log("data for create chat ", data);
            if (data.success) {
                setNewChatName('');
                setShowChatInput(false);
                await getChats();
            } else {
                toast,error(data.message);
            }
        } catch (error) {
            console.error('Error adding chat:', error);
            toast.error('Failed to create chat. Please try again.');
        }
    };

    const getChats = async () => {
        try {
            const data = await getChat();
            console.log("data for get chats ", data);
            if (data.success) {
                setChat(data.data.allChats);
                if (data.data.allChats.length > 0) {
                    setSelectedChatId(data.data.allChats[0]._id);
                    setChatHistory(data.data.allChats[0].chats);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            toast.error('Failed to fetch chats. Please try again.');
        }
    };
    const handleDelete = async (name) => {
        if (!window.confirm(`Delete chat "${name}"?`)) return;
        try {
            const msg = await deleteChat(name);
            toast.success(msg);
            getChats();
        } catch (err) {
            toast.error("Could not delete chat: " + err.message);
        }
    };
    useEffect(() => {
        getChats();
    }, []);
    if(getChatLoading){
        return(
            <ChatShimmer/>
        )
    }

    return (
        <div className='flex flex-row h-screen'>

            <div className="w-[20%] bg-blue-green text-whitetext p-6 hidden sm:flex flex-col gap-4">
                {/* New Chat Section */}
                <div>
                    <div
                        className="flex items-center justify-between cursor-pointer hover:bg-blue-green-hover p-2 rounded-lg transition-all duration-200"
                        onClick={() => setShowChatInput(!showChatInput)}
                    >
                        <div className="flex items-center gap-2">
                            <EditNoteIcon fontSize="medium" />
                            <h2 className="text-base font-semibold">New Chat</h2>
                        </div>
                    </div>
                    {showChatInput && (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Enter chat name"
                                value={newChatName}
                                onChange={(e) => setNewChatName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && createChats()}
                                className="w-full p-2 rounded bg-white text-black text-sm outline-none"
                            />
                        </div>
                    )}
                </div>

                {/* Search Section */}
                <div>
                    <div
                        className="flex items-center justify-between cursor-pointer hover:bg-blue-green-hover p-2 rounded-lg transition-all duration-200"
                        onClick={() => setShowSearchInput(!showSearchInput)}
                    >
                        <div className="flex items-center gap-2">
                            <SearchOutlinedIcon fontSize="medium" />
                            <h2 className="text-base font-semibold">Search</h2>
                        </div>
                    </div>
                    {showSearchInput && (
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Enter chat name"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                                className="w-full p-2 rounded bg-white text-black text-sm outline-none"
                            />
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-white/30 my-2"></div>

                {/* Chat List Section */}
                <div className="flex flex-col gap-2 overflow-y-auto">
                    <div className="flex items-center gap-2">
                        <ChatOutlinedIcon fontSize="medium" />
                        <h2 className="text-base font-semibold">Chats</h2>
                    </div>

                    {chat.length === 0 ? (
                        <p className="text-sm text-gray-300 mt-2">No chats yet.</p>
                    ) : (
                        chat
                            .filter((c) => c.name.toLowerCase().includes(searchItem.toLowerCase()))
                            .map((chatItem, index) => (
                                <div
                                    key={chatItem._id}
                                    onClick={() => onClickChat(index)}
                                    className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-green-hover cursor-pointer transition-all duration-200"
                                >
                                    <span className="text-sm">{chatItem.name}</span>
                                    <DeleteForeverRoundedIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(chatItem.name);
                                        }}
                                        className="text-red-400 hover:text-red-600"
                                    />
                                </div>
                            ))
                    )}
                </div>
            </div>

            {showSidebar && (
                <div className="p-4 pt-2 fixed inset-0 z-40 bg-blue-green w-[60%] text-whitetext md:p-8 flex flex-col md:gap-4 sm:hidden transition-transform">
                    <div className="flex justify-end">
                        <button onClick={() => setShowSidebar(false)} className="text-white text-3xl ">×</button>
                    </div>
                    <div className='w-full bg-blue-green text-whitetext  flex-col  gap-4  flex'>
                        <div className='flex flex-col gap-0 mb-2'>
                            <div
                                className='flex items-center gap-2 cursor-pointer hover:bg-blue-green-hover p-2 rounded-lg transition-all duration-200'
                                onClick={() => setShowChatInput(!showChatInput)}
                            >
                                <EditNoteIcon fontSize="large" />
                                <h2 className='text-lg font-semibold'>New chat</h2>
                            </div>

                            {showChatInput && (
                                <div className="flex flex-col gap-2 p-2">
                                    <input
                                        type="text"
                                        placeholder="Enter chat name"
                                        value={newChatName}
                                        onChange={(e) => setNewChatName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                createChats();
                                            }
                                        }}
                                        className="p-2 rounded bg-white text-black text-sm outline-none"
                                    />
                                </div>

                            )}

                            <div >
                                <div
                                    className='flex items-center gap-2 cursor-pointer hover:bg-blue-green-hover p-2 rounded-lg transition-all duration-200'
                                    onClick={() => setShowSearchInput(!showSearchInput)}
                                >
                                    <SearchOutlinedIcon fontSize="large" />
                                    <h2 className='text-lg font-semibold'>Search chats</h2>
                                </div>
                                {showSearchInput && (
                                    <div className="flex flex-col gap-2 pt-2">
                                        <input
                                            type="text"
                                            placeholder="Enter chat name"
                                            value={searchItem}
                                            onChange={(e) => setSearchItem(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {

                                                }
                                            }}
                                            className="p-2 rounded bg-white text-black text-sm outline-none"
                                        />
                                    </div>


                                )}

                            </div>
                        </div>

                        <div className='flex flex-col gap-0 mb-8'>
                            <div className='flex items-center gap-2 p-2'>
                                <ChatOutlinedIcon fontSize="large" />
                                <h2 className='text-lg font-semibold'>Chats</h2>
                            </div>
                            {chat.filter((chatItem) =>
                                chatItem.name.toLowerCase().includes(searchItem.toLowerCase())
                            ).map((chatItem, index) => (
                                <div
                                    key={chatItem._id}
                                    onClick={() => onClickChat(index)}
                                    className='flex items-center gap-2 cursor-pointer hover:bg-blue-green-hover p-2 rounded-lg transition-all duration-200'
                                >
                                    <div className='flex items-center justify-between w-full'>
                                        <h2 className='text-base font-medium'>{chatItem.name}</h2>
                                        <DeleteForeverRoundedIcon onClick={() => deleteChat(chatItem.name)}
                                            className=' cursor-pointer hover:text-red-700' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Chat Screen */}
            <div className="w-[100%] relative min-h-screen bg-admin-pattern text-gray flex flex-col justify-between sm-w[86%] md:w-[86%]">
                <div className='flex flex-col justify-center items-center text-center h-[8%] relative'>
                    <div className="sm:hidden fixed left-4  p-2 rounded shadow-lg">
                        <MenuRoundedIcon
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="cursor-pointer text-blue-green"
                        />
                    </div>

                    <div className="text-center ">
                        <h1
                            className="text-3xl sm:text-6xl font-extrabold leading-tight sm:leading-[1.2] animate-pop text-transparent bg-clip-text inline-block"
                            style={{
                                backgroundImage: 'linear-gradient(to right, var(--bg-blue-green), var(--hover-bg-blue-green-hover))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            CollegeVerse
                        </h1>
                    </div>
                </div>


                {chatHistory.length === 0 ? (
                    <div className="flex-1 flex justify-center items-center flex-col">
                        <img src={assets.header_img} alt="" className="w-36 h-36 rounded-full mb-6" />
                        <h1 className="flex items-center gap-2 text-2xl font-medium mb-2">
                            Hey {userData?.name || 'User'}
                            <img className="w-8 h-8" src={assets.hand_wave} alt="" />
                        </h1>
                        <h2 className="text-3xl font-semibold mb-4">
                            {loading ? 'Gyani is typing...' : 'Start chatting with Gyani...'}
                        </h2>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
                        {chatHistory.map((entry, index) => {
                            if (index % 2 !== 0) return null;
                            const userEntry = chatHistory[index];
                            const botEntry = chatHistory[index + 1];
                            return (
                                <div key={index}>
                                    <p className="font-semibold text-gray-700">You:</p>
                                    <p className="mb-2">{userEntry.parts[0]?.text}</p>
                                    {userEntry.parts[0]?.fileData?.fileUri && (
                                        <div className="mb-2">
                                            <img
                                                src={userEntry.parts[0].fileData.fileUri}
                                                alt="Uploaded"
                                                className="max-w-xs rounded-lg border"
                                            />
                                            <p className="text-sm text-gray-500">[Image uploaded]</p>
                                        </div>
                                    )}
                                    <p className="font-semibold text-blue-green">Gyani:</p>
                                    <div className="mb-4 space-y-4">
                                        <Markdown>{botEntry?.parts[0]?.text}</Markdown>
                                    </div>
                                    <hr className="border-bordergray" />
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Image Preview */}
                {selectedImage && (
                    <div className="absolute bottom-20 left-4 flex items-center gap-4 bg-white p-2 rounded-lg shadow-md border max-w-xs">
                        <img src={URL.createObjectURL(selectedImage)} alt="Preview" className="w-20 h-20 object-cover rounded" />
                        <span className="text-sm text-gray">Image selected</span>
                    </div>
                )}

                {/* Input Bar */}
                <div className="w-[100%] px-4 py-3 border-t border-bordergray flex items-center gap-4 fixed bottom-0 bg-admin-pattern sm-w[80%] md:w-[80%]">
                    <Input
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && getresponse(message)}
                        disableUnderline
                        className="!text-gray !bg-whitebg border border-bordergray !rounded-xl w-full px-4 py-1"
                        placeholder="Type a message"
                        fullWidth
                        endAdornment={
                            <InputAdornment position="end">
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    <AddPhotoAlternateIcon className="cursor-pointer" onClick={handleImageClick} />
                                </>
                            </InputAdornment>
                        }
                    />
                    <button
                        onClick={() => getresponse(message)}
                        className="flex justify-center items-center bg-blue-green hover:bg-blue-green-hover text-whitetext p-2 rounded-full transition-all duration-200 cursor-pointer h-10 w-10"
                    >
                        {loading ? <Loader /> : <NorthIcon />}
                    </button>
                </div>
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                  />
        </div>
    );
};

export default Bot;
