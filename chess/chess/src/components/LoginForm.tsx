import { useState } from "react";
import '../styles/login.css';
import axios from "axios";
import { API_BASE } from "./App";
import { useNavigate } from "react-router-dom";

export function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = async()=>{
        try{
            const request = await axios.post(`${API_BASE}/auth/login`, {
                username: username, password: password
            });
    
            if(request.status == 200){
                const response = JSON.parse(request.data);
                const { token } = response.data;
    
                localStorage.setItem('username', username);
                localStorage.setItem('token', token);
    
                navigate('/lobby');
            }else{
                alert(request.data.message ?? 'An unexpected error occured');
            }
        }catch(err:any){
            console.log('The error ->', err); //this would be something like sentry but I'm broke
            alert('An unexpected error occured');
        }
    }

    return (
        
            <div className="form">
                <label>
                    Username:
                </label>
                    <input id = "username" name="username" placeholder="Enter your username" 
                    value = {username} onChange={(event)=>setUsername(event.target.value)} required/>
                
                <br/>
                <label>
                    Password:
                </label>
                    <input id = "password" name="password" type="password"
                    placeholder = "Enter Password"
                    value={password} onChange = {(event)=>setPassword(event.target.value)} required/>
                
                <br/>
                
                <button className="successButton" onClick={login}>Login!</button>
        </div>
    );
    
}