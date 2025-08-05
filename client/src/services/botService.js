import apiClient from "../api/apiClient";
import { Endpoints } from "../constants/Endpoints";

export const botService = {
    getChats : ()=>{
        const res = apiClient.get(Endpoints.BOT.getChats);
        console.log(res,'res in services');
        return res;
    },
    deleteChat: (name) =>
    apiClient.delete(
      Endpoints.BOT.deleteChat,
      { params: { name } }         // pass name as a query param
    ),
    createChat : (name) => {
        const res = apiClient.post(Endpoints.BOT.createChat, {name});
        console.log(res,'res in services to create chat');
        return res;
    }
    //add chat 

}