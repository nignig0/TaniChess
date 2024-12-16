import { Link, useNavigate } from 'react-router-dom';
import '../styles/navBar.css';


export function NavBar(){
    const loggedIn = localStorage.getItem('token') != null;
    const navigate = useNavigate();
    const logOut = ()=>{
        if(localStorage.getItem('token')) localStorage.removeItem('token');
        if(localStorage.getItem('username')) localStorage.removeItem('username');
        navigate('/');
    }

    return (
        <nav>
            <ul>
                <li><Link to='/lobby'>Lobby</Link></li>
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