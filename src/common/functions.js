let userLoggedIn = (currentUser) => currentUser && currentUser.uid

const gameNotAllowed = (authPlayer, player) => authPlayer.uid === player.uid;

const isPlaying = (player) =>  {
    return player && player.isPlaying;
}

export {
    userLoggedIn, gameNotAllowed, isPlaying
}