<template>
<v-container>
  <v-card>
    <v-toolbar flat color="primary" dark>
      <v-toolbar-title>Generate ranking</v-toolbar-title>
    </v-toolbar>
    <v-stepper v-model="e6" vertical>

    <!-- Step 1 : Import files -->
    <v-stepper-step :complete="e6 > 1" step="1">Import files</v-stepper-step>
    <v-stepper-content step="1">
      <v-card class="mb-12 ma-5" elevation="2">
        <FilesInput :semestersInput="semestersInput" @update="fileUpdate($event)" />
      </v-card>
      <v-btn color="primary" @click="fileSubmit" :disabled="!states.fileInput" :loading="loadings.fileInput">Continue</v-btn>
    </v-stepper-content>

    <!-- Step 2 : Resolve conflicts -->
    <v-stepper-step :complete="e6 > 2" step="2" :rules="[() => false]">Resolve conflicts<small>Optional</small></v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey lighten-5" class="mb-12" height="auto">
        <Conflicts :conflictsInput="conflictingStudents" :semesterModel="semestersModel" @update="conflictsUpdate($event)" />
      </v-card>
      <v-btn color="primary" @click="e6 = 3" :disabled="!states.conflictInput">Continue</v-btn>
    </v-stepper-content>

    <!-- Step 3 : Output options -->
    <v-stepper-step :complete="e6 > 3" step="3">Output options</v-stepper-step>
    <v-stepper-content step="3">
      <v-card color="grey lighten-5" class="mb-12" height="auto">
        <Options :optionsOutput="optionsOutput" @update="optionsOutput[$event.name]=$event.value"/>
      </v-card>
      <v-btn color="primary" @click="optionsSubmit">Continue</v-btn>
    </v-stepper-content>

    <!-- Step 4 : Download files -->
    <v-stepper-step step="4">Download files</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-5" class="mb-12" height="auto">
        <FilesOutput :optionsOutput="optionsOutput" :studentsOuput="studentsOuput" :semestersModel="semestersModel" />
      </v-card>
    </v-stepper-content>
  </v-stepper>
  </v-card>
  
</v-container>
</template>

<script>
import FilesInput from "./FilesInput";
import Conflicts from "./Conflicts";
import Options from "./Options";
import FilesOutput from "./FilesOutput";
import { ModelSemesters } from "../assets/js/modules/generate_model";
const config = require("../assets/config.json");
import { StudentUtils } from "../assets/js/modules/student_module";

export default {
  name: "Stepper",

  data() {
    return {
      optionsOutput: {
        rankByTemporaryAverage: true,
        separateApprentice: true,
      },
      semestersInput: config.semesters,
      states: {
        fileInput: false,
        conflictInput: false
      },
      loadings: {
        fileInput: false,
      },
      e6: 1,
      students: new Array(),
      semestersModel: ModelSemesters.getModelSemesters(),
    };
  },
  computed: {
    conflictingStudents: function() {
      const studentes = new Array();
      const finalSemester = this.semestersModel.semesters.filter(semester => semester.finalSemester)[0];
      const otherSemesters = this.semestersModel.semesters.filter(semester => !semester.finalSemester);
      this.students.forEach(student => {
        if(finalSemester.hasAverage(student.id) && !(otherSemesters.map(semester => semester.hasAverage(student.id)).reduce((p,c) => p && c))) {
          studentes.push(student);
        }
      })
      return studentes;
    },
    studentsOuput: function () {
      let studentes = new Array();
      const finalSemester = this.semestersModel.semesters.filter(semester => semester.finalSemester)[0];
      this.students.forEach(student => {
        if(finalSemester.hasAverage(student.id)) {
          studentes.push(student);
        }
      });
      return studentes;
    }
  },
  components: {
    FilesInput,
    Conflicts,
    Options,
    FilesOutput
  },

  methods: {
    fileSubmit() {
      this.loadings.fileInput = true;
      StudentUtils.fromFilesFillModel(this.semestersInput, this.semestersModel, this).then(() => {
        this.loadings.fileInput = false;
        this.e6 = this.conflictingStudents.length == 0 ? 3 : 2;
      }); 
    },
    fileUpdate(event) {
      this.states.fileInput = event;
    },
    conflictsUpdate(event){
      this.states.conflictInput = event;
    },
    optionsSubmit() {
      this.$set(this.semestersModel, "test", true);
      this.e6 = 4
    }
  },
};
</script>