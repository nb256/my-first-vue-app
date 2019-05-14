import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

Vue.use(VeeValidate);

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

import axios from 'axios'

// axios.defaults.withCredentials = false;
// axios.defaults.proxy = {
//   host: 'http://192.168.1.239',
//   port: 15000,
// };

Vue.prototype.$http = axios


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});