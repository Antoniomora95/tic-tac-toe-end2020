export class Player{

    constructor(uid, name, email, imageUrl, isOnline = false, isPlaying = false){
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.isOnline = isOnline;
        this.isPlaying = isPlaying;
    }
    
}

// player 1 always will have the X position in the game
export class CatGame {
    constructor(uid, player1Uid){
        this.uid = uid;
        this.player1 =  player1Uid;
        this.player2 = '';
        this.board = this.fillInitialArray(9);
        this.winnerPlayer = false
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