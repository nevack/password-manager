import {MainHeader} from "../Headers.js";
import {guardLogin, getUser} from "../users.js";
import {onClick, copyHelper} from "../utils.js";
import navigate from "../../app.js";
import {getPasswords, getFavicon} from "../data.js";

const helper = copyHelper();

let PasswordView = {
    render: async (passwordData) => {
        return `
            <li class="passwords_item hoverable " id="${passwordData.id}">
                <span class="passwords_item_name">${passwordData.name}</span>
                <div class="passwords_item_login">
                    <img class="clickable passwords_item_password_copy" src="../../images/key-black.svg" alt="copy"/>
                    <span class="mono">${passwordData.login}</span>
                </div>
            </li>
        `;
    },
    after_render: async (passwordData) => {
        let element = document.getElementById(passwordData.id);
        if (passwordData.website) {
            element.insertAdjacentHTML('beforeend', `
                <a class="passwords_item_url" target="_blank" href="${passwordData.website}">
                    <img class="passwords_item_favicon" src="${getFavicon(passwordData.website)}" alt="favicon">
                    <span class="mono" >${passwordData.website}</span>
                </a>
            `)
        }

        onClick(element.getElementsByClassName("passwords_item_password_copy")[0], () => {
            helper.copy(passwordData.password);
        });
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
                    <li class="actions_list_item clickable button" id="action-add">
                        Add new password entry
                    </li>
                </ul>
            </div>
            <div class="passwords">
                ${helper.inject()}
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

export default PasswordsPage;
