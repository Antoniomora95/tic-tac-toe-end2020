import { CatGame } from "../common/Classes";
import { stringifyError } from "../common/functions";
import { gamesRef } from "../firebase/configuration";
import { toogleIsPlaying } from "./playerService";

const handleStartGame = async (authPlayer, challengedPlayer) => {
    try {
        // create the game model and store it in DB
        let gameUid = gamesRef.push().key;
        let { uid: player1Uid } = authPlayer;
        let {uid: player2Uid} = challengedPlayer;
        let game = new CatGame(gameUid, player1Uid, player2Uid);
        let gameReference = gamesRef.child(gameUid);
        let gameSet = await gameReference.set(game);
        // toggle playing prop to  true to block any other coming request
        await toogleIsPlaying(player1Uid, true);
        return true;
    } catch (error) {
        console.log(stringifyError(error));
    }
}

const subscribeForChallenges = (setPlayers) => gamesRef.on('child_added', (childSnapshot, prevChildKey) => {
    // I'm listening for new games, but need to filter only the ones where I'm the second player (challenges to me)
    console.log(childSnapshot.val(), prevChildKey, 'I´m listening for challenges');
    //getPlayersOnline(setPlayers);
});

const unsubscribeForChallenges = (setPlayers) => {
    gamesRef.off();
}

/*const getNewChallenges = async (setPlayers) => {
    try {
        // when you do not understand something select the method orderByChild --> and open the definiton on internet
        let dataSnapshot = await playersRef.orderByChild(DB_REF_PLAYERS_PROP_IS_ONLINE).equalTo(true).once('value');
        let players = dataSnapshot && dataSnapshot.val() ? dataSnapshot.val() : {};
        
        setPlayers(transformToArray(players));
    } catch (error) {
        console.log(stringifyError(error));
    }
}*/

export {
    handleStartGame, subscribeForChallenges, unsubscribeForChallenges
}
