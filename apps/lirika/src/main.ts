import './styles.css';
import { createApp } from 'vue';
import router from './router/index'
import App from './app/App.vue';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App);
app.use(router);
app.mount('#root');
