<template>
  <div class="container">
    <example-header/>
    <div>
      <stackable-view/>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "ExampleAppRootComponent",

  components: {
    "example-header": Header
  }
};
</script>

<style>
body {
  font-family: sans-serif;
  margin: 0;
}
</style>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container div {
  flex: 1;
  position: relative;
}
</style>
