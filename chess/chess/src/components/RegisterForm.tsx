import { useState } from "react";
import '../styles/register.css';
import '../styles/login.css';
import { isUsernameValid, isEmailVaid, isPasswordValid } from '../utils'
import axios from "axios";
import { API_BASE } from "./App";
import { useNavigate } from "react-router-dom";

export function RegisterForm(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();


    const register = async()=>{
        console.log('We here')
        try{
            if(isUsernameValid(username) && isPasswordValid(password, passwordConfirm) &&
                isEmailVaid(email)){
                    const request = await axios.post(`${API_BASE}/auth/register`, {
                        username: username, 
                        email: email, 
                        password: password,
                        passwordConfirm: passwordConfirm
                    });

                    if(request.status == 200){
                        console.log('Response -> ', request.data);
                        const response = request.data;
                        const { token } = response.data.token;

                        localStorage.set('username', username);
                        localStorage.set('token', token);
                        navigate('/lobby');

                    }else{
                        alert(request.data.message ?? 'An unexpected error occured')
                    }
                }

        }catch(err: any){
            console.log('Error registering -> ', err);
            alert('An unexpected error occured. Please try again later!');
        }
    }


    return (
        <div className="form">
            <label>
                Username:
            </label>   
            <input id = "username" name="username" placeholder="Enter your username"
            value={username} onChange={(event)=>setUsername(event.target.value)} required/> 

            <label>
                Email:
            </label>   
            <input id = "email" name="email" placeholder="Enter your email"
            value={email} onChange={(event)=>setEmail(event.target.value)} required/>   
            
            <label>
                Password:
            </label>
            <input id = "password" name="password" placeholder="Enter password"
            type = "password"
            value={password} onChange={(event)=>setPassword(event.target.value)} required/>
            
            <label>
                Password Again:
            </label>
            <input id = "passwordConfirm" name="passwordConfirm" placeholder = "We just want to be sure"
            type="password"
            value={passwordConfirm} onChange={(event)=>setPasswordConfirm(event.target.value)} required/>
             
            <button className='sucessButton' onClick={register}>Register</button>
        </div>
    );
    
}