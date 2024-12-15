import { useState } from "react";
import { CreateRoomButton } from "../components/createRoom";
import { LoginForm } from "../components/LoginForm";
import '../styles/index.css';
import { RegisterForm } from "../components/RegisterForm";
export function Index(){
    const [showLoginForm, setShowLoginForm] = useState(true);

    const changeForm = async()=> setShowLoginForm(!showLoginForm);

    return (
        <div className='body'>
            <h1>64 Squares</h1>
            <p>2 colors, 64 squares</p>
            {showLoginForm ?
            (
                <>
                <LoginForm/>
                <a onClick={changeForm}>Don't have an account?</a>
                </>
            
            )
            :
            (
                <>
                <RegisterForm/>
                <a onClick={changeForm}>Already have an account?</a>
                </>
            )
            
            
        }
            <CreateRoomButton/>
            <p>You can play anonymously but you won't be able to view past games</p>
        </div>
    );
}