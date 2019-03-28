export class Socket {
    constructor(url, jwt) {
        this.socket = new WebSocket(url,jwt);

    }

    openHandler(handler) {
        this.socket.onopen = () => handler();
    }

    messageHandler(handler) {
        this.socket.onmessage = (eventMessage) => {
            const data = eventMessage.data;
            console.log(data)
            if (data.includes("ERROR")) {
                alert(data)
            }
            handler(JSON.parse(data));
        }
    }



    sendMessage(data) {
        this.socket.send(JSON.stringify(data));
    }
}


