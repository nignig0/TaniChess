import '../styles/createGameButton.css'
import { createRoom } from '../apiUtils';
import { useNavigate } from 'react-router-dom';

export function CreateRoomButton(){
    const navigate = useNavigate();
    const action = async()=>{
        const id = await createRoom();
        if(!id){
            alert('An unexpected error occured');
            return;
        }
        navigate(`/${id!}`);
    }
    
    return (
        <button onClick = {action}>
            CREATE GAME!
        </button>
    );
}