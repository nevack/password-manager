import LoginPage from "./js/pages/LoginPage.js";
import SignupPage from "./js/pages/SignupPage.js";
import PasswordsPage from "./js/pages/PasswordsPage.js";
import {NoopHeader} from "./js/Headers.js";

let TestPage = {
    render: async () => {
        let view =  /*html*/`
            <p>Test SPA content page.</p>
        `
        return view;
    },
    after_render: async () => {
        // Do nothing
    }
}

let routes = {
    "/login": LoginPage,
    "/signup": SignupPage,
    "/passwords": PasswordsPage,
    "/": LoginPage
}

async function loadPage(page) {
    console.log("Loaging page...");

    const headerView = page.header ? page.header : NoopHeader
    const header = document.getElementById('header');
    header.innerHTML = await headerView.render();
    await headerView.after_render();

    const content = document.getElementById('content');
    content.innerHTML = await page.render();
    await page.after_render();
}

let resolveRoute = (route) => {
    try {
        return routes[route];
    } catch (error) {
        return undefined;
    }
};

let router = (to) => {
    console.log(location.hash.slice(1).toLowerCase())
    const url = to || window.location.hash.slice(1) || "/";
    console.log("Routing to " + url)
    const routeResolved = resolveRoute(url) || TestPage;
    loadPage(routeResolved);
};

// document.addEventListener("DOMContentLoaded", () => {
//     router()
// });
// Listen on hash change:
window.addEventListener('hashchange',() => router());

// Listen on page load:
window.addEventListener('load', () => router());

export default router;
