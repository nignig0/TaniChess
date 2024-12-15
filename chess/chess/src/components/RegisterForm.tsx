import { useState } from "react";
import '../styles/register.css';
import '../styles/login.css';

export function RegisterForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <div className="form">
             <label>
                Username:
            </label>   
            <input id = "username" name="username" placeholder="Enter your username"
            value={username} onChange={(event)=>setUsername(event.target.value)} required/>  
            
            <label>
                Password:
            </label>
            <input id = "password" name="password" placeholder="Enter password"
            value={password} onChange={(event)=>setPassword(event.target.value)} required/>
            
            <label>
                Password Again:
            </label>
            <input id = "passwordConfirm" name="passwordConfirm" placeholder = "We just want to be sure"
            value={passwordConfirm} onChange={(event)=>setPasswordConfirm(event.target.value)} required/>
             
            <button className='sucessButton'>Register</button>
        </div>
    );
    
}