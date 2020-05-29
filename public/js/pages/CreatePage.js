import {MainHeader} from "../Headers.js";
import navigate from "../../app.js";
import {getUser, guardLogin} from "../users.js";


let CreatePage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
    },
    render: async () => {
        let view =  /*html*/`
            <div class="passwords">
                <form id="password_form" class="card_wrap">
                    <input type="text" name="name" class="mono password_form_control password_form_input" placeholder="Account Name" required>
                    <input type="text" name="login" class="mono password_form_control password_form_input" placeholder="Login" required>
                    <input type="text" name="password" class="mono password_form_control password_form_input" placeholder="Password" required>
                    <input type="url" name="website" class="mono password_form_control password_form_input" placeholder="Website">
                    <button id="password_submit" type="submit" class="password_form_control password_form_button">Save</button>
                </form>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = await getUser();

        let form = document.getElementById("password_form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const values = {};
            new FormData(form).forEach((value, key) => {
                    values[key] = value;
            });

            savePassword(user.uid, values).then(() => navigate("/passwords"));
        });

    }
}

async function savePassword(userId, passwordData) {
    const db = firebase.firestore();
    const passRef = db.collection('users').doc(userId).collection('passwords').doc();

    passRef.set(passwordData);
}

export default CreatePage;
