import $ from 'jQuery'
import md5 from 'crypto-js/md5'

export class UserList {
    constructor(listSelector) {
        this.$listElement = $(listSelector);
    }
    
    draw(users_array, getName) {
        this.$listElement.empty();
        users_array.forEach((el) => {
            let ceva = 0;
            el.onLineFl ? ceva = 'antiquewhite' : ceva = "#A89CEB";
            let $a = $('<a>', {
                href: "#",
                class: "userUser"
            }).css("background-color", ceva).css("text-decoration", "none").css("color", "black");
            let $userRow = $('<li>', {
            })
            let font_weight = 0;
            el.onLineFl ? font_weight = 'bold' : font_weight = "normal";
            let $span = $('<span>', {
                class: "userName",
                text: el.name
            }).css('font-weight', font_weight)
            let $img = $('<img>', {
                src: `https://www.gravatar.com/avatar/${md5(this.username).toString()}`
            })
            $a.append($userRow).append($span).append($img)
            $a.on("click", function(event){
                event.preventDefault();
                return getName(el.name);
            })
            this.$listElement.append($a);
        })
    }
}
// class User {
//     constructor(name){
//         this.name = name;
//     }
// }