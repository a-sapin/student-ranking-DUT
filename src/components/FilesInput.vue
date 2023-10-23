<template>
  <v-container class="pa-10">
    <v-row
      class="d-flex mb-5 mb-lg-0"
      v-for="(semester, semesterIndex) in this.semestersInput"
      :key="semester.id"
    >
      <v-col class="d-flex align-start col-12">
        <v-row class="d-flex align-center">
          <v-icon color="primary" medium>{{ icons.mdiBook }}</v-icon>
          <h6 class="text-h6 ms-2">{{ semester.name }}</h6>
        </v-row>
      </v-col>
      <v-col class="col-12">
        <v-row
          class="ms-lg-5"
          v-for="(input, inputIndex) in semester.inputs"
          :key="input.id"
        >
          <v-col class="col-9 col-md-5 col-lg-4 d-flex align-start">
            <v-row class="d-flex align-center mt-0 pt-0">
              <v-icon color="blue" medium>{{ icons.mdiSchool }}</v-icon>
              <p class="body-1 ms-2 mb-0">{{ input.name }}</p>
            </v-row>
          </v-col>
          <v-col class="col-2 col-md-3 col-lg-5 d-flex align-start pb-2">
            <v-file-input
              class="mt-0 pt-0"
              placeholder="Choose file"
              required
              accept=".csv"
              :hide-input="$vuetify.breakpoint.md || $vuetify.breakpoint.lg || $vuetify.breakpoint.xl ? false : true"
              @change="checkFile($event, semesterIndex, inputIndex, semester.id)"
            ></v-file-input>
          </v-col>
          <v-col class="col-12 col-md-4 col-lg-3 d-flex align-center pt-1" >
            <v-btn color="primary" elevation="2" fab :loading="true" icon x-small v-if="input.file && input.loading && !input.valid"></v-btn>
            <v-icon color="green" medium v-if="input.file && !input.loading && input.valid">{{ icons.mdiCheckUnderlineCircle }}</v-icon>
            <v-icon color="red" medium v-if="input.file && !input.loading && !input.valid">{{ icons.mdiCloseCircle }}</v-icon>
            <p class="caption ms-5 mb-0">{{ input.message }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiBook, mdiSchool, mdiCheckUnderlineCircle, mdiCloseCircle } from "@mdi/js";
import { StudentUtils } from "../assets/js/modules/student_module";

export default {
  name: "FilesInput",

  props: {
    semestersInput: {
      type: Array,
    },
  },

  data() {
    return {
      icons: {
        mdiBook,
        mdiSchool,
        mdiCheckUnderlineCircle,
        mdiCloseCircle,
      },
    };
  },

  methods: {
    checkFile(event, semesterIndex, inputIndex, semesterId) {
      this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "file", event);
      this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "message", "");
      if (event) {
        this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "loading", true);
        this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "valid", false);
        this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "message", "File checking");
        StudentUtils.checkHeaders(semesterId, event).then((count) => {
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "loading", false);
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "valid", true);
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "message", count + (count > 1 ? " students " : "student") + "found");
          this.$emit("update",this.semestersInput.map((e) => e.inputs).flat().map((e) => e.valid).reduce((p, c) => p && c)
      );
        }).catch(error => {
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "loading", false);
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "valid", false);
          this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "message", error);
        }).finally(() => {
          this.$emit("update",this.semestersInput.map((e) => e.inputs).flat().map((e) => e.valid).reduce((p, c) => p && c));
        });
      } else {
        this.$set(this.semestersInput[semesterIndex].inputs[inputIndex], "valid", false);
        this.$emit("update",this.semestersInput.map((e) => e.inputs).flat().map((e) => e.valid).reduce((p, c) => p && c));
      } 
    },
  },
};
</script>