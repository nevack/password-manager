import navigate from "../app.js";
import {onClick} from "./utils.js";
import {getUser, signout} from "./users.js";

let NoopHeader = {
    render: async () => ``,
}

let MainHeader = {
    render: async () => {
        return `
            <div class="header_wrap">
                <div class="logo_wrap" id="logo_link">
                    <span class="logo"></span>
                    <h1>Password Manager</h1>
                </div>
                <span id="header_account"></span>
                <a href="#" id="header_signout">Sign Out</a>
            </div>
        `;
    },
    after_render: async () => {
        onClick(document.getElementById("logo_link"), () => {
            navigate("/")
        })

        onClick(document.getElementById("header_signout"), () => {
            signout().then(() => navigate("/"));
        })

        const user = await getUser();
        const field = document.getElementById("header_account");
        field.innerText = user.email;
    }
}

export {NoopHeader, MainHeader};
