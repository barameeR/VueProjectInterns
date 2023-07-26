import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import Game from '../src/pages/Game.vue';
import Home from '../src/pages/Home.vue';

// Vuetify
import 'vuetify/dist/vuetify.min.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

// Define some routes
const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
];

// Create the router instance and pass the routes option
const router = createRouter({
  history: createWebHistory(), // Provide the history implementation (hash mode for simplicity)
  routes,
});

// Create and mount the root Vue app instance
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');