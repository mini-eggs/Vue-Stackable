import Vue from "vue";
import VueStackable from "vue-stackable";
import App from "./App";

import HomeScene from "./scenes/Home";
import AboutScene from "./scenes/About";
import MoreScene from "./scenes/More";

const options = {
  Home: HomeScene,
  About: AboutScene,
  More: MoreScene
};

Vue.use(VueStackable(options));

new Vue({ el: "#app", ...App });
