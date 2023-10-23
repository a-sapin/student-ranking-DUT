<template>
  <v-app>
    <v-main>
      <Banner/>
      <Infos/>
      <Stepper/>
      <Footer/>
    </v-main>
  </v-app>
</template>
<script>
import Stepper from "./components/Stepper";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import Infos from "./components/Infos"

export default {
  name: "App",

  components: {
    Stepper,
    Footer,
    Banner,
    Infos
  },
};
</script>
