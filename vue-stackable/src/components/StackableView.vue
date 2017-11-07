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

export default {
  name: "stackable-view",

  data() {
    return {
      stack: this.$routes,
      stackTrace: [this.$routes[0]]
    };
  },

  mounted() {
    // console.log(this.$routes);
  },

  render(createElement) {
    return createElement(
      "div",
      { class: "stackable-container" },
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
.stackable-container {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.25);
}

.stackable-route {
  position: relative;
  height: 100%;
  width: 100%;
  animation-name: AnimateRoute;
  animation-duration: 500ms;

  &.stackable-route-root {
    animation-name: none;
    animation-duration: 0ms;
  }

  &.stackable-route-background {
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
</style>