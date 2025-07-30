import { useContext } from "react";
import { AppContext } from "../contex/AppContex";
import { Navigate } from "react-router-dom";


const ProtectedRoute=({children})=>{
    const{isLoggedin}=useContext(AppContext);

    if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }
  return children
}

export default ProtectedRoute