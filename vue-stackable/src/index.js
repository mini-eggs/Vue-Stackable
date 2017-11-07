import StackableView from "./components/StackableView";

const plugin = options => Vue => {
  // Register components.
  Vue.component(StackableView.name, StackableView);

  // Create prototype functions.
  Vue.prototype.$push = routeName => {
    console.log(routeName);
  };

  Object.defineProperty(Vue.prototype, "$routes", {
    get: () =>
      Object.keys(options).map(key => ({
        routeName: key,
        component: options[key]
      }))
  });
};

export default plugin;
