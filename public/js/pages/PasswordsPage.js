import router from "../../app.js"

let PasswordView = {
    render: async (passwordData) => {
        let view =  /*html*/`
            <li class="passwords_item">
                <span class="passwords_item_name">${passwordData.name}</span>
                <span class="passwords_item_login">${passwordData.login}</span>
                <a href="${passwordData.website}" target="_blank">${passwordData.website}</a>
            </li>
        `
        return view;
    },
    after_render: async () => {

    }
}

let NoPasswordsView = {
    render: async () => {
        let view =  /*html*/`
            <li class="passwords_item">
                No passwords added yet.
            </li>
        `
        return view;
    },
    after_render: async () => {

    }
}

let PasswordsPage = {
    render: async () => {
        let view =  /*html*/`
            <div class="passwords">
                <ul id="passwords_list">
                </ul>
            </div>
        `
        return view;
    },
    after_render: async () => {
        const user = firebase.auth().currentUser;

        if (user == null) {
            router("/login")
            return;
        }

        const db = firebase.firestore();
        const passRef = db.collection('users').doc(user.uid).collection('passwords');

        let pass = await passRef.get().catch(function(error) {
            alert("Error getting document: " + error);
        });

        let list = document.getElementById("passwords_list")
        if (pass.exists) {
            for (let index = 0; index < pass.length; index++) {
                list.insertAdjacentHTML('beforeend', await PasswordView.render(pass[index]))
            }
        } else {
            list.insertAdjacentHTML('beforeend', await NoPasswordsView.render())
        }

    }
}

export default PasswordsPage;
