import {MainHeader} from "../Headers.js";
import {guardLogin, getUser} from "../users.js";
import {onClick} from "../utils.js";
import navigate from "../../app.js";

let PasswordView = {
    render: async (passwordData) => {
        return `
            <li class="passwords_item" id="${passwordData.id}">
                <span class="passwords_item_name">${passwordData.name}</span>
                <span class="passwords_item_login">${passwordData.login}</span>
            </li>
        `;
    },
    after_render: async (passwordData) => {
        if (passwordData.website) {
            let element = document.getElementById(passwordData.id);
            const hostname = (new URL(passwordData.website)).hostname;

            element.insertAdjacentHTML('beforeend', `
                <img class="passwords_item_favicon" src="https://s2.googleusercontent.com/s2/favicons?domain=${hostname || "example.com"}">
                <a href="${passwordData.website}" target="_blank">${passwordData.website}</a>
            `)
        }
    }
}

let NoPasswordsView = {
    render: async () => {
        return `
            <li class="passwords_item">
                No passwords added yet.
            </li>
        `;
    },
}

let PasswordsPage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
    },
    render: async () => {
        return `
            <div class="actions">
                <ul id="actions_list">
                    <li class="actions_list_item" id="action-add">
                        Add new password entry
                    </li>
                </ul>
            </div>
            <div class="passwords">
                <ul id="passwords_list">
                </ul>
            </div>
        `;
    },
    after_render: async () => {
        onClick(document.getElementById("action-add"), () => {
            navigate("/create");
        });

        let list = document.getElementById("passwords_list");

        const user = await getUser();
        let passwords = await getPasswords(user.uid);

        if (!passwords) {
            list.insertAdjacentHTML('beforeend', await NoPasswordsView.render());
            return;
        }

        for (const password of passwords) {
            list.insertAdjacentHTML('beforeend', await PasswordView.render(password));
            await PasswordView.after_render(password);
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

    return passQuery.docs.map(query => {
        const password = query.data();
        password.id = query.id;
        return password;
    });
}

export default PasswordsPage;
