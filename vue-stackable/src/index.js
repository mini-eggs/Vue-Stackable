import StackableView from "./components/StackableView";

const plugin = options => Vue => {
  // Start event bus.
  const eventBus = new Vue();

  // Register components.
  Vue.component(StackableView.name, StackableView);

  // Register mixin.
  Vue.mixin({
    computed: {
      VueStackableEventBus() {
        return eventBus;
      }
    }
  });

  // Create prototype functions.
  Vue.prototype.$push = (routeName, options = {}) => {
    const props = { routeName, options };
    eventBus.$emit("vue-stackable:route-push", props);
  };

  Vue.prototype.$pop = () => {
    eventBus.$emit("vue-stackable:route-pop");
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
