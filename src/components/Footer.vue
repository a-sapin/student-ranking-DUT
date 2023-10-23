<template>
  <v-footer class="primary white--text" padless>
    <v-col class="text-center pt-5" cols="12">
        <a href="https://www.linkedin.com/in/emilienbidet/" target="_blank">Emilien BIDET</a>, Anisse DAHMANI, Florentin DURAND, Arthur SAPIN
    </v-col>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>IUT Nantes</strong>
    </v-col>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>