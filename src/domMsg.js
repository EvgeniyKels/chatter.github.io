import $ from 'jQuery'
import md5 from 'crypto-js/md5'
import moment from 'moment'

export class ChatForm {
    constructor(formSelector, inputSelector){
        this.$formElement = $(formSelector);
        this.$inputElement = $(inputSelector);
    }

    inputHandler(handler){
        this.$formElement.submit((event) => {
            event.preventDefault();
            handler(this.$inputElement.val());
            this.$inputElement.val("");
        })
    }
}

function renewTime() {
    $('[data-time]').each((i, e) => {
        let $e = $(e);
        let time = $e.attr('data-time');
        $e.html(moment(time).fromNow());
    })
}
export class ChatList {
    constructor (listSelector){
        this.$listElement = $(listSelector);
        setInterval(renewTime, 10000);
    }

    draw(chatMessage){
        chatMessage.messages.forEach((msg) => {
            let $messageRow = $('<li>', {
                class : "message-row"
            })
            if (msg.username === sessionStorage.getItem('NAME')) {
                $messageRow.addClass('me');
            }
            let $img = $('<img>', {
                src : `https://www.gravatar.com/avatar/${md5(msg.username).toString()}`
            })
            let $message = $('<p>');
            $message.append($('<span>', {
                class : 'message-username',
                text : msg.username
            }))
            $message.append($('<span>', {
                class : 'message-timestamp',
                'data-time' : msg.timestamp,
                text : moment(msg.timestamp).fromNow()
            }));
            $message.append($('<span>', {
                class : "message-message",
                text : msg.message
            }))
            $messageRow.append($img).append($message);
            this.$listElement.append($messageRow);
            $messageRow.get(0).scrollIntoView();
        })
    }
}