import Vue from "vue";
import VueStackable from "vue-stackable";
import App from "./App";

import HomeScene from "./scenes/Home";
import AboutScene from "./scenes/About";

const options = {
  Home: HomeScene,
  About: AboutScene
};

Vue.use(VueStackable(options));

new Vue({ el: "#app", ...App });
