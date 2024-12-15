import { useState } from "react";
import '../styles/login.css';

export function LoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                    <input id = "password" name="password"
                    value={password} onChange = {(event)=>setPassword(event.target.value)} required/>
                
                <br/>
                
                <button className="successButton">Login!</button>
        </div>
    );
    
}