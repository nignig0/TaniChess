import blackKing from '../assets/black-king.png';
import whiteKing from '../assets/white-king.png';
import '../styles/NameHolder.css';

type NameHolderProps = {
    name?: string,
    color: string
}

export function NameHolder({ name, color }: NameHolderProps){
    return (
        <div className='nameHolder'>
            <img src={ (color == 'WHITE') ? whiteKing : blackKing} height= '25px' /> 
            <h2>{name ?? 'Anonymous'}</h2>
        </div>
    );
}