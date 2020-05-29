import {MainHeader} from "../Headers.js";
import navigate from "../../app.js";
import {getUser} from "../users.js";

let PasswordView = {
    render: async (passwordData) => {
        let view =  /*html*/`
            <li class="passwords_item">
                <span class="passwords_item_name">${passwordData.name}</span>
                <span class="passwords_item_login">${passwordData.login}</span>
                <a href="${passwordData.website}" target="_blank">${passwordData.website}</a>
            </li>
        `
        return view;
    },
    after_render: async () => {

    }
}

let NoPasswordsView = {
    render: async () => {
        let view =  /*html*/`
            <li class="passwords_item">
                No passwords added yet.
            </li>
        `
        return view;
    },
    after_render: async () => {

    }
}

let PasswordsPage = {
    header: MainHeader,
    render: async () => {
        let view =  /*html*/`
            <div class="passwords">
                <ul id="passwords_list">
                </ul>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = await getUser();

        if (user == null) {
            navigate("/login")
            return;
        }

        await MainHeader.after_render(user.email);

        let list = document.getElementById("passwords_list");

        let passwords = await getPasswords(user.uid);

        if (!passwords) {
            list.insertAdjacentHTML('beforeend', await NoPasswordsView.render());
            return;
        }

        for (const password of passwords) {
            list.insertAdjacentHTML('beforeend', await PasswordView.render(password));
        }
    }
}

async function getPasswords(userId) {
    const db = firebase.firestore();
    const passRef = db.collection('users').doc(userId).collection('passwords');

    let passQuery = await passRef.get().catch(function(error) {
        alert("Error getting document: " + error);
    });

    if (!passQuery || passQuery.empty) {
        return null;
    }

    return passQuery.docs.map(query => query.data());
}

export default PasswordsPage;
