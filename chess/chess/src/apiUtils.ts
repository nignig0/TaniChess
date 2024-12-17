import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "./components/App";


export const createRoom = async ()=>{
    try{
        const request = await axios.post(`${API_BASE}/room`);
        const response = request.data;
        console.log('The response -> ', response);
        return response.data._id;
    }catch(err: any){
        alert('An unexpected error occured');
        return null;
    } 
}
