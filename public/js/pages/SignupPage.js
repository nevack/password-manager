import navigate from "../../app.js";
import {ifLoggedIn, signup} from "../users.js";
import {onClick} from "../utils.js";

let SignupPage = {
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
                        <button id="login_submit" type="submit" class="clickable hoverable button login_form_control">Sign Up</button>
                        <a id="log_in" href="/login">Want to Log In?</a>
                    </form>
                </div>
            </div>
        `;
    },
    after_render: async () => {
        let form = document.getElementById("login_form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form)
            signup(formData.get("email"), formData.get("password")).then(() => {
                navigate("/passwords")
            });
        });

        onClick(document.getElementById("log_in"), () => {
            navigate("/login")
        });
    }
}

export default SignupPage;
