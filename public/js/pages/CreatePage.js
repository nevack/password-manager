import {MainHeader} from "../Headers.js";
import navigate from "../../app.js";
import {getUser, guardLogin} from "../users.js";
import {onSubmit} from "../utils.js";
import {savePassword} from "../data.js";


let CreatePage = {
    header: MainHeader,
    before_render: async () => {
        await guardLogin();
    },
    render: async () => {
        return `
            <div class="passwords">
                <form id="password_form" class="card_wrap">
                    <input type="text" name="name" class="mono password_form_control password_form_input" placeholder="Account Name" required>
                    <input type="text" name="login" class="mono password_form_control password_form_input" placeholder="Login" required>
                    <input type="text" name="password" class="mono password_form_control password_form_input" placeholder="Password" required>
                    <input type="url" name="website" class="mono password_form_control password_form_input" placeholder="Website">
                    <button id="password_submit" type="submit" class="button hoverable clickable password_form_control password_form_button">Save</button>
                </form>
            </div>
        `;
    },
    after_render: async () => {
        const user = await getUser();

        onSubmit(document.getElementById("password_form"), (data) => {
            savePassword(user.uid, data).then(() => navigate("/passwords"));
        })
    }
}

export default CreatePage;
