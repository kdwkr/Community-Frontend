import Vue from 'vue';
import { Viewer, Editor } from '@toast-ui/vue-editor';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSyncAlt,
  faEdit,
  faTrash,
  faReply,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import vueMoment from 'vue-moment';
import moment from 'moment';
import Loading from '@/components/Loading.vue';

import App from './App.vue';
import router from './router';
import store from './store';

import 'moment/locale/ko';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import './axiosInstance';

library.add(faSyncAlt, faEdit, faTrash, faReply, faTimes);

Vue.use(vueMoment, {
  moment,
});
Vue.component('Icon', FontAwesomeIcon);
Vue.component('TViewer', Viewer);
Vue.component('TEditor', Editor);
Vue.component('Loading', Loading);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
