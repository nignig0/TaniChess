export interface Message {
    type: string,
    canPlay?: boolean,
    move?: [string],//a move has two strings starting and ending position
    roomId?: string,
    fen?: any
};

export interface Game {
    roomId: string,
    color: string, 
    player: string
}
