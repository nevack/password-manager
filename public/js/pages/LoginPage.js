import navigate from "../../app.js";
import {ifLoggedIn, login} from "../users.js";
import {onClick, onSubmit} from "../utils.js";

let LoginPage = {
    before_render: async () => {
        ifLoggedIn(() => navigate("/passwords"));
    },
    render: async () => {
        return `
            <div class="form_content">
                <div class="card_wrap">
                    <div class="logo_wrap">
                        <span class="logo"></span>
                        <h1>Password Manager</h1>
                    </div>
                    
                    <form id="login_form">
                        <input type="email" name="email" class="login_form_control login_input" placeholder="Your E-mail" required>
                        <input type="password" name="password" class="login_form_control login_input" minlength="8" placeholder="Your Password" required>
                        <button id="login_submit" type="submit" class="clickable hoverable button login_form_control">Log In</button>
                        <a id="sign_up" href="/signup">Want to Sign Up?</a>
                    </form>
                </div>
            </div>
        `;
    },
    after_render: async () => {
        onSubmit(document.getElementById("login_form"), ({ email, password }) => {
            login(email, password).then(() => navigate("/passwords"))
        });

        onClick(document.getElementById("sign_up"), () => {
            navigate("/signup")
        });
    }
}

export default LoginPage;
