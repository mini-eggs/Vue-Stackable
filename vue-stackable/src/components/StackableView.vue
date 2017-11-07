<script>
const getClassName = (index, stackSize) => {
  const classNameFromIndex = (() => {
    switch (index) {
      case 0: {
        return "stackable-route stackable-route-root";
      }
      default: {
        return "stackable-route";
      }
    }
  })();

  const classNameFromPosition =
    index < stackSize - 1 ? "stackable-route-background" : "";

  return `${classNameFromIndex} ${classNameFromPosition}`;
};

const getContainerClass = ({ popping }) => {
  return popping
    ? "stackable-container stackable-container-popping"
    : "stackable-container";
};

export default {
  name: "stackable-view",

  data() {
    return {
      stack: this.$routes,
      stackTrace: [this.$routes[0]],
      popping: false,
      transitioning: false
    };
  },

  mounted() {
    this.VueStackableEventBus.$on(
      "vue-stackable:route-push",
      this.handleRoutePush
    );
    this.VueStackableEventBus.$on(
      "vue-stackable:route-pop",
      this.handleRoutePop
    );
  },

  destroyed() {
    this.VueStackableEventBus.$off(
      "vue-stackable:route-push",
      this.handleRoutePush
    );
    this.VueStackableEventBus.$off(
      "vue-stackable:route-pop",
      this.handleRoutePop
    );
  },

  methods: {
    handleRoutePop() {
      if (this.transitioning || this.stackTrace.length === 1) {
        return;
      }

      const nextStackTrace = Array.from([...this.stackTrace]);
      nextStackTrace.pop();

      this.transitioning = true;
      this.popping = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.transitioning = false;
          this.popping = false;
          this.stackTrace = nextStackTrace;
        }, 500);
      });
    },

    handleRoutePush({ routeName, options }) {
      if (this.transitioning) {
        return;
      }

      const nextRoute = this.stack.reduce(
        (total, current) => (current.routeName === routeName ? current : total),
        null
      );

      if (!routeName) {
        throw new Error("Route could not be found.");
        return;
      }

      this.transitioning = true;
      this.stackTrace = [...this.stackTrace, nextRoute];

      this.$nextTick(() => {
        setTimeout(() => {
          this.transitioning = false;
        }, 500);
      });
    }
  },

  render(createElement) {
    return createElement(
      "div",
      { class: getContainerClass(this.$data) },
      this.stackTrace.map((item, index) =>
        createElement(item.component, {
          class: getClassName(index, this.stackTrace.length),
          key: index
        })
      )
    );
  }
};
</script>

<style scoped lang="scss">
// START HERE
.stackable-container.stackable-container-pushing {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f1f1f1;

  .stackable-route {
    animation-fill-mode: forwards;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    animation-name: AnimateRoute;
    animation-duration: 500ms;
    background-color: #f1f1f1;

    &.stackable-route-root {
      animation-name: none;
      animation-duration: 0ms;
    }

    &.stackable-route-background {
      animation-name: AnimateRouteBackground;
      animation-duration: 500ms;
    }
  }
}

@keyframes AnimateRoute {
  from {
    opacity: 0.25;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes AnimateRouteBackground {
  from {
    opacity: 1;
    transform: none;
  }
  to {
    opacity: 0.5;
    transform: translateX(-100px);
  }
}

.stackable-container.stackable-container-popping {
  .stackable-route {
    animation-name: AnimateBackIn;
    animation-duration: 500ms;

    &:last-of-type {
      animation-name: AnimateOut;
      animation-duration: 500ms;
    }
  }
}

@keyframes AnimateOut {
  from {
    opacity: 1;
    transform: none;
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}

@keyframes AnimateBackIn {
  from {
    opacity: 0.5;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
</style>