import router from "../../app.js";

let SignupPage = {
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
                        <button id="login_submit" type="submit" class="login_form_control login_button">Sign Up</button>
                        <a id="log_in" href="/#/login">Want to Log In?</a>
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
            signup(formData.get("email"), formData.get("password"));
        });
    }
}

function signup(email, password) {
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        router("/login")
    }).catch(error => alert(error));
}

export default SignupPage;
