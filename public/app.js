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

async function loadPage(page) {
    console.log("Loaging page...");
    const content = document.getElementById('content');
    content.innerHTML = await page.render();
    await page.after_render();
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage(TestPage);
});