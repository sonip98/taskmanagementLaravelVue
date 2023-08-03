import './bootstrap';

import { createApp } from 'vue';

import App from './vue/app.vue';
import router from './router';
import store from './vue/store';

const app = createApp({
    components: {
        App
    }
});

app.use(router).use(store).mount("#app");