import {ChatApp} from './app'
import {FormHandlerSignUp} from './formhandler'
import {FormHandlerSignIn} from './formhandler'

const signup = new FormHandlerSignUp('[data-login="form"]');
const chatApp = new ChatApp('[data-chat="form"]', '[data-chat="input"]', '[data-chat="list"]',
    '[data-chat="users"]');
const signin = new FormHandlerSignIn('[data-login="form_"]',chatApp);