import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    userData:{}
}
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userData:(state,action)=>{
            const getUserData=  async()=>{
                try{
                    const {data} = await axios.get(backendUrl+'api/user/data');
                    if(data.success)
                    {
                        state.userData=data.userData;
                    }
                    else
                    {
                        alert.alert(data.message);
                    }
                }
                catch(err)
                {
                    alert('Error fetching user data: ' + err.message);
                }
            }
            getUserData();
        }
    }

})

export const {userData}= authSlice.actions
export default authSlice.reducer