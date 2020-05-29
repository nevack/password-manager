const db = firebase.firestore();

export async function savePassword(userId, passwordData) {
    db.collection('users').doc(userId).collection('passwords').add(passwordData);
}

export async function getPasswords(userId) {
    const passRef = db.collection('users').doc(userId).collection('passwords');

    let passQuery = await passRef.get().catch(function (error) {
        alert("Error getting document: " + error);
    });

    if (!passQuery || passQuery.empty) {
        return null;
    }

    return passQuery.docs.map(query => {
        const password = query.data();
        password.id = query.id;
        return password;
    });
}

export function getFavicon(website) {
    const hostname = (new URL(website)).hostname || "example.com";
    return "https://s2.googleusercontent.com/s2/favicons?domain=" + hostname;
}
