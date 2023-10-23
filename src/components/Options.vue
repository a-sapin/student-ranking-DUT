<script>
export default {
  name: "Options",
  props: ["optionsOutput"],
  data() {
      return {
          isTemporaryAverage: this.optionsOutput.rankByTemporaryAverage,
          isSeparateApprentice: this.optionsOutput.separateApprentice,
          ouputFormats: ["csv", "odt"]
      }
  }
};
</script>

<template>
  <v-container class="pa-10">
      <h6 class="text-h6">Ranking options</h6>
      <p>Rank students by their {{isTemporaryAverage ? "temporary" : "final"}} average</p>
      <v-switch
      v-model="isTemporaryAverage"
      :label="isTemporaryAverage ? 'Temporary average' : 'Final average'"
      @change="$emit('update', {name:'rankByTemporaryAverage', value: isTemporaryAverage})"
      ></v-switch>
      <p>{{isSeparateApprentice ? "Separate" : "Group"}} apprenticeship students {{isSeparateApprentice ? "from" : "and"}} general education students</p>
      <v-switch
      v-model="isSeparateApprentice"
      :label="isSeparateApprentice ? 'Separate' : 'Group'"
      @change="$emit('update', {name:'separateApprentice', value: isSeparateApprentice})"
      ></v-switch>
      <h6 class="text-h6">File output options (coming soon)</h6>
      <p>File output format</p>
      <v-select
        class="mt-0 pt-0"
        :items="ouputFormats"
        :value="'csv'"
        :disabled="true">
      </v-select>
  </v-container>
</template>
