import $ from 'jQuery'

export class FormHandlerSignUp {
    constructor(formSelector) {
        this.$forma = $(formSelector);
        registration(serverconnection, this.$forma);
    }
}

export class FormHandlerSignIn {
    constructor(formSelector, chatApp) {
        this.$forma = $(formSelector);
        this.chatApp = chatApp;
        this.$chatter = $('[data-chat="Pikachu"]')
        this.login();
    }

    login() {
        this.$forma.on('submit', async (ev) => {
            ev.preventDefault();
            let data = {};
            let $chatter = this.$chatter;
            $(ev.target).serializeArray().forEach((i) => {
                data[i.name] = i.value;
            })
            event.target.reset();
            let a = {};
            try {
                a = await loginconnection(data);
            } catch (e) {
                console.log(`${e.status} === Sorry, are  ${e.statusText}`)
                return;
            }
            sessionStorage.setItem("JWT", a.jwt);
            sessionStorage.setItem("NAME", a.name);
            $chatter.html('Welcome ' + a.name).css("font-size", '30px');
            this.chatApp.init();
        })
    }

}

function loginconnection(data) {
    return $.ajax({
        // url: "http://localhost:5001/users/login",
        url: " https://chatterservater.herokuapp.com/users/login",
        type: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json"
    })
}

function serverconnection(data) {
    return $.ajax({
        // url: "http://localhost:5001/users/signup",
        url: "https://chatterservater.herokuapp.com/users/signup",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json"
    })
}

function registration(fn, form) {
    form.on('submit', (ev) => {
        ev.preventDefault();
        let data = {};
        $(ev.target).serializeArray().forEach((i) => {
            data[i.name] = i.value;
        })
        event.target.reset();
        fn(data).catch("no connection registration")
    })
}