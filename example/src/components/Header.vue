<template>
  <header>
    <button @click="$push('Home')">
      Home
    </button>
    <button @click="$push('About')">
      About
    </button>
    <button @click="$push('More')">
      More
    </button>
    <button @click="$pop" style="float: right;">
      Back
    </button>
  </header>
</template>

<script>
export default {
  name: "ExampleHeaderComponent"
};
</script>

<style scoped lang="scss">
header {
  height: 58px;
  background-color: blue;
  padding: 0 15px;
  position: relative;
  z-index: 5;

  button {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
