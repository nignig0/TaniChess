import { Link, useNavigate } from 'react-router-dom';
import '../styles/navBar.css';
import { createRoom } from '../apiUtils';


export function NavBar(){
    const loggedIn = localStorage.getItem('token') != null;
    const navigate = useNavigate();
    const logOut = ()=>{
        if(localStorage.getItem('token')) localStorage.removeItem('token');
        if(localStorage.getItem('username')) localStorage.removeItem('username');
        navigate('/');
    }

    const action = async()=>{
        const id = await createRoom();
        if(!id){
            alert('An unexpected error occured');
            return;
        }
        navigate(`/${id!}`);
    }

    return (
        <nav>
            <ul>
                <li onClick = {action}> Create Game</li>
                <li onClick = {()=> navigate('/lobby')}>Lobby</li>
                {loggedIn?
                (
                    <li onClick = {logOut}>Log out</li>
                ):
                (<></>)
                }
            </ul>
        </nav>
    );
}