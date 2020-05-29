import navigate from "../app.js";

const auth = firebase.auth();

export async function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).catch(error => alert(error));
}

export async function getUser() {
    return await new Promise(resolve => {
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    })
}

export function ifLoggedIn(action) {
    getUser().then(user => {
        if (user) action(user)
    }).catch(alert)
}
