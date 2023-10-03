import Vue from 'vue'
import router from "@/router";
import store from "@/store";

import App from './App.vue'

import { validate } from "@/directives";

import BaseInput from "@/components/UI/BaseInput.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseSelect from "@/components/UI/BaseSelect.vue";

import './assets/styles/main.scss';

Vue.config.productionTip = false

Vue.component('base-input', BaseInput);
Vue.component('base-button', BaseButton);
Vue.component('base-select', BaseSelect);

Vue.directive("validate", validate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
