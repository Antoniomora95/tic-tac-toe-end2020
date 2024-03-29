import  { DB_REF_GAME_AVAILABLE_STATUSES } from './constants.json';
import { getTime } from './functions';
const { IS_NEW } = DB_REF_GAME_AVAILABLE_STATUSES;
 export class Player{
    constructor(uid, name, email, imageUrl, isOnline = false, isPlaying = false, existentChallenge = false, loggedAt = getTime()){
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.isOnline = isOnline;
        this.isPlaying = isPlaying;
        this.existentChallenge = existentChallenge;
        this.loggedAt = loggedAt;
    }
    
}

// player 1 always will have the X position in the game
export class CatGame {
    constructor(uid, player1Uid, player2Uid, winner = '', hasWinner = false, status = IS_NEW, createdAt = getTime(), nowPlaying = '',   board){
        this.uid = uid;
        this.player1 =  player1Uid;
        this.player2 = player2Uid;
        this.nowPlaying = !!nowPlaying ? nowPlaying : player1Uid;
        this.winner = winner ;
        this.hasWinner = hasWinner;
        this.board = board || this.fillInitialArray(9);
        this.status = status;
        this.createdAt = createdAt;
    }

    fillInitialArray(length_) {
        var arr = new Array(length_);
        for (var i = 0; i < length_; i++) {
            arr[i] = new SquareObj(i)
        }
        return arr;
    }
    
}
export class SquareObj {
    constructor(id = '', value = '') {
        this.id = id;
        this.value = value
    }
}