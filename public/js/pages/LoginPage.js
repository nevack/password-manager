import navigate from "../../app.js";
import {ifLoggedIn} from "../users.js";
import {onClick} from "../utils.js";

let LoginPage = {
    before_render: async () => {
        ifLoggedIn(() => navigate("/passwords"));
    },
    render: async () => {
        let view =  /*html*/`
            <div class="form_content">
                <div class="card_wrap">
                    <div class="logo_wrap">
                        <span class="logo"></span>
                        <h1>Password Manager</h1>
                    </div>
                    
                    <form id="login_form">
                        <input type="email" name="email" class="login_form_control login_input" placeholder="Your E-mail" required>
                        <input type="password" name="password" class="login_form_control login_input" minlength="8" placeholder="Your Password" required>
                        <button id="login_submit" type="submit" class="login_form_control login_button">Log In</button>
                        <a id="sign_up" href="#">Want to Sign Up?</a>
                    </form>
                </div>
            </div>
        `
        return view;
    },
    after_render: async () => {
        let form = document.getElementById("login_form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form)
            login(formData.get("email"), formData.get("password"));
        });

        onClick(document.getElementById("sign_up"), () => {
            navigate("/signup")
        });
    }
}

function login(email, password) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(() => navigate("/passwords"))
        .catch(alert);
}

export default LoginPage;
