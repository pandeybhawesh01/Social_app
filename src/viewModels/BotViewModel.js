import { useState } from "react";
import { botService } from "../services/botService";

const useBotViewModel = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    const getChat = async() =>{
        setLoading(true);
        setError(null);
        try {
            const res = await botService.getChats();
            if(res.data.success) return res.data;
            throw new Error(res.message);
        } catch (err) {
            console.log("err", err);
            setError(
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                'Failed to load profile'
            );
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }
    const deleteChat = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const res = await botService.deleteChat(name);
      if (!res.data.success) throw new Error(res.data.message);
      return res.data.message; // success message
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
    const createChat = async (name) => {
    setLoading(true);
    setError(null);
    try {
      const res = await botService.createChat(name);
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to create chat"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };
    return {
        loading,
        error,
        getChat,
        deleteChat,
        createChat,
    }
}
export default useBotViewModel;