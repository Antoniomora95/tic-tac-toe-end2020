let userLoggedIn = (currentUser) => currentUser && currentUser.uid

const gameNotAllowed = (authPlayer, player) => authPlayer.uid === player.uid;

const isPlaying = (player) =>  {
    return player && player.isPlaying;
}

const stringifyError = error => {
    if(error instanceof Error) {
        return error.toString();
    } else {
        return JSON.stringify(error);
    }
}
export {
    userLoggedIn, gameNotAllowed, isPlaying, stringifyError
}
