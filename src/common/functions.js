let isValidUser = (currentUser) => currentUser && currentUser.uid

const gameNotAllowed = (authPlayer, player) => authPlayer.uid === player.uid;

const isPlaying = (player) =>  {
    return player && player.isPlaying;
}
const isExistentChallenge = (authPlayer, player) => {
    return (authPlayer && authPlayer.existentChallenge) || (player && player.existentChallenge)
}

const stringifyError = error => {
    if(error instanceof Error) {
        return error.toString();
    } else {
        return JSON.stringify(error);
    }
}
export {
    isValidUser, gameNotAllowed, isPlaying, isExistentChallenge, stringifyError
}
