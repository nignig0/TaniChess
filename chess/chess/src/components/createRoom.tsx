import React from 'react';
import axios from 'axios';
import { API_BASE } from './App';
import { useNavigate } from 'react-router-dom';

export function CreateRoomButton(){

    const navigate = useNavigate();

    const createRoom = async ()=>{
        try{
            const request = await axios.post(`${API_BASE}/room`);
            const response = request.data;
            console.log('The response -> ', response);

            navigate(`/${response._id}`);
        }catch(err: any){
            alert('An unexpected error occured');
        } 
    }

    return (
        <button onClick = {createRoom}>
            Create Game
        </button>
    );
}