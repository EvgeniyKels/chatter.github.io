import {Socket} from './ws-client'
import {ChatList, ChatForm} from './domMsg'
import {UserList} from './domUser'
import {FormHandlerSignUp} from './formhandler'
import {FormHandlerSignIn} from './formhandler'

function getUser() {
    return {
        jwt: sessionStorage.getItem("JWT"),
        name: sessionStorage.getItem("NAME")
    }
}

export class ChatApp {
    constructor(formSelector, inputSelector, listSelector, userSelector) {
        this.userList = new UserList(userSelector);
        this.chatList = new ChatList(listSelector);
        this.chatForm = new ChatForm(formSelector, inputSelector);
    }
    init() {
        let a;
        const connection = new Socket("ws://localhost:5001/socket", getUser().jwt);
        // const connection = new Socket("ws://chatterservater.herokuapp.com/socket", getUser().jwt);
        connection.openHandler(() => {
            this.chatForm.inputHandler((message) => {
                if (message === "") return 
                const chatMessage = new ChatMessage(getUser().name, message, a);
                chatMessage["jwt"] = getUser().jwt
                connection.sendMessage(chatMessage);
            })
        });
        
        connection.messageHandler((serverMessage) => {
            console.log(serverMessage)
                if (serverMessage.userlist === false) {
                    this.chatList.draw(serverMessage);
                } else {
                    this.userList.draw(serverMessage, getName);
                }
            }
        )

        function getName(name) {
            a = name;
            console.log(a)
        }
    }
}
class ChatMessage {
    constructor(username, message, partner) {
        this.username = username;
        this.message = message;
        this.timestamp = new Date();
        this.companion = partner;
    }
}