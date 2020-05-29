import LoginPage from "./js/pages/LoginPage.js";
import SignupPage from "./js/pages/SignupPage.js";
import PasswordsPage from "./js/pages/PasswordsPage.js";
import CreatePage from "./js/pages/CreatePage.js";
import {Router} from "./router.js";

let routes = {
    "/login": LoginPage,
    "/signup": SignupPage,
    "/passwords": PasswordsPage,
    "/create": CreatePage,
    "/": LoginPage
}

document.addEventListener("DOMContentLoaded", () => {
    Router.init(routes);
});

export default function navigate(path) {
    Router.instance.navigate(path).catch(alert)
}

