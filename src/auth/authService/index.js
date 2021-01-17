
import { app, database } from '../../firebase/configuration';
import { DB_REF_PLAYERS } from '../../common/constants.json'

// https://firebase.google.com/docs/database/web/read-and-write?authuser=0
export const signupPlayer = async (uid, name, email, imageUrl) => {
    try {
        const player = { uid, name, email, imageUrl };
        await database.ref(`${DB_REF_PLAYERS}/${uid}`).set(player);
        return true;
    } catch (error) {
        throw error;
    }
}

export const findOnePlayer = async (uid) => {
    try {
        let snapshot = await database.ref(`${DB_REF_PLAYERS}/${uid}`).get();
        return snapshot.val();
    } catch (error) {
        throw error;
    }
}

export const signOutPlayer = (updateAuthContext, history) => {
    return async () => {
        try {
            await app.auth().signOut();
            updateAuthContext({})
        } catch (error) {
            console.log(error);
        }
    }
}

export const stringifyError = error => {
    if(error instanceof Error) {
        return error.toString();
    } else {
        return JSON.stringify(error);
    }
}