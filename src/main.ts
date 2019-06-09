import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import {Button, Select, TabPane, Tabs, Card, Switch, Form, FormItem, Input, Icon, Notification} from 'element-ui';

Vue.use(Button);
Vue.use(Select);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Icon);

Vue.prototype.$notify = Notification;
// console.log('Message', Message);

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');
