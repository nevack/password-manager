import router from "../app.js";

let NoopHeader = {
    render: async () => {
        let view =  /*html*/``
        return view;
    },
    after_render: async () => {

    }
}

let MainHeader = {
    render: async () => {
        let view =  /*html*/`
            <div class="header_wrap">
                <div class="logo_wrap">
                    <span class="logo"></span>
                    <h1>Password Manager</h1>
                </div>
                <span id="header_account"></span>
                <a href="#" id="header_signout">Sign Out</a>
            </div>
        `
        return view;
    },
    after_render: async (account) => {
        if (account) {
            const field = document.getElementById("header_account");
            field.innerText = account


            const signout = document.getElementById("header_signout");
            signout.addEventListener('click', () => {
                firebase.auth().signOut().then(function() {
                    router("/login");
                }).catch(alert);
            })
        }
    }
}

export {NoopHeader, MainHeader};
