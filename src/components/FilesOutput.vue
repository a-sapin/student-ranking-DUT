<script>
export default {
  name: "FilesOutput",
  props: ["optionsOutput", "studentsOuput", "semestersModel"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    generalStudentsSorted: function () {
      const studentes = this.studentsOuput.filter(
        (student) => student.apprentice == false
      );
      if (this.optionsOutput.rankByTemporaryAverage) {
        return studentes
          .sort(
            (student, otherStudent) =>
              this.semestersModel.getTemporaryAverage(student.id) -
              this.semestersModel.getTemporaryAverage(otherStudent.id)
          )
          .reverse();
      }
      return studentes
        .sort(
          (student, otherStudent) =>
            this.semestersModel.getAverage(student.id) -
            this.semestersModel.getAverage(otherStudent.id)
        )
        .reverse();
    },
    apprenticeStudentsSorted: function () {
      const studentes = this.studentsOuput.filter(
        (student) => student.apprentice == true
      );
      if (this.optionsOutput.rankByTemporaryAverage) {
        return studentes
          .sort(
            (student, otherStudent) =>
              this.semestersModel.getTemporaryAverage(student.id) -
              this.semestersModel.getTemporaryAverage(otherStudent.id)
          )
          .reverse();
      }
      return studentes
        .sort(
          (student, otherStudent) =>
            this.semestersModel.getAverage(student.id) -
            this.semestersModel.getAverage(otherStudent.id)
        )
        .reverse();
    },
    studentsSorted: function () {
      const studentes = this.studentsOuput;
      if (this.optionsOutput.rankByTemporaryAverage) {
        return studentes
          .sort(
            (student, otherStudent) =>
              this.semestersModel.getTemporaryAverage(student.id) -
              this.semestersModel.getTemporaryAverage(otherStudent.id)
          )
          .reverse();
      }
      return studentes
        .sort(
          (student, otherStudent) =>
            this.semestersModel.getAverage(student.id) -
            this.semestersModel.getAverage(otherStudent.id)
        )
        .reverse();
    },
    generalStudentsSortedToCsv: function () {
      // Headers ouput
      const headers = ["Rang", "Nom_Etudiant", "code_nip"];
      if (this.optionsOutput.rankByTemporaryAverage) {
        headers.push("M123SP");
        headers.push("M123");
      } else {
        headers.push("M123");
        headers.push("M123SP");
      }
      this.semestersModel.semesters.forEach((semester) => {
        headers.push(semester.id);
        semester.ues.forEach((ue) => {
          headers.push(ue.id);
        });
      });
      // Students row
      const rows = this.generalStudentsSorted.map((student, index) => {
        const values = [index + 1, student.name, student.id];
        if (this.optionsOutput.rankByTemporaryAverage) {
          values.push(this.semestersModel.getTemporaryAverage(student.id));
          values.push(this.semestersModel.getAverage(student.id));
        } else {
          values.push(this.semestersModel.getAverage(student.id));
          values.push(this.semestersModel.getTemporaryAverage(student.id));
        }
        this.semestersModel.semesters.forEach((semester) => {
          values.push(semester.getAverage(student.id));
          semester.ues.forEach((ue) => {
            values.push(ue.getAverage(student.id));
          });
        });
        return values;
      });
      return encodeURI(
        "data:text/csv;charset=utf-8," +
          headers.join(",") +
          "\n" +
          rows.map((e) => e.join(",")).join("\r\n")
      );
    },
    apprenticeStudentsSortedToCsv: function () {
      // Headers ouput
      const headers = ["Rang", "Nom_Etudiant", "code_nip"];
      if (this.optionsOutput.rankByTemporaryAverage) {
        headers.push("M123SP");
        headers.push("M123");
      } else {
        headers.push("M123");
        headers.push("M123SP");
      }
      this.semestersModel.semesters.forEach((semester) => {
        headers.push(semester.id);
        semester.ues.forEach((ue) => {
          headers.push(ue.id);
        });
      });
      // Students row
      const rows = this.apprenticeStudentsSorted.map((student, index) => {
        const values = [index + 1, student.name, student.id];
        if (this.optionsOutput.rankByTemporaryAverage) {
          values.push(this.semestersModel.getTemporaryAverage(student.id));
          values.push(this.semestersModel.getAverage(student.id));
        } else {
          values.push(this.semestersModel.getAverage(student.id));
          values.push(this.semestersModel.getTemporaryAverage(student.id));
        }
        this.semestersModel.semesters.forEach((semester) => {
          values.push(semester.getAverage(student.id));
          semester.ues.forEach((ue) => {
            values.push(ue.getAverage(student.id));
          });
        });
        return values;
      });
      return encodeURI(
        "data:text/csv;charset=utf-8," +
          headers.join(",") +
          "\n" +
          rows.map((e) => e.join(",")).join("\r\n")
      );
    },
    studentsSortedToCsv: function () {
      // Headers ouput
      const headers = ["Rang", "Nom_Etudiant", "code_nip"];
      if (this.optionsOutput.rankByTemporaryAverage) {
        headers.push("M123SP");
        headers.push("M123");
      } else {
        headers.push("M123");
        headers.push("M123SP");
      }
      this.semestersModel.semesters.forEach((semester) => {
        headers.push(semester.id);
        semester.ues.forEach((ue) => {
          headers.push(ue.id);
        });
      });
      // Students row
      const rows = this.studentsSorted.map((student, index) => {
        const values = [index + 1, student.name, student.id];
        if (this.optionsOutput.rankByTemporaryAverage) {
          values.push(this.semestersModel.getTemporaryAverage(student.id));
          values.push(this.semestersModel.getAverage(student.id));
        } else {
          values.push(this.semestersModel.getAverage(student.id));
          values.push(this.semestersModel.getTemporaryAverage(student.id));
        }
        this.semestersModel.semesters.forEach((semester) => {
          values.push(semester.getAverage(student.id));
          semester.ues.forEach((ue) => {
            values.push(ue.getAverage(student.id));
          });
        });
        return values;
      });
      return encodeURI(
        "data:text/csv;charset=utf-8," +
          headers.join(",") +
          "\n" +
          rows.map((e) => e.join(",")).join("\r\n")
      );
    },
  },
};
</script>

<template>
  <v-container class="pa-10">
    <v-container v-if="optionsOutput.separateApprentice">
      <v-row class="d-flex">
        <v-col class="col-4 align-center d-flex">
          Ranking of students in general education
        </v-col>
        <v-col class="col-8">
          <a :href="generalStudentsSortedToCsv" download="output.csv"><v-btn color="primary" elevation="1">Download</v-btn></a>
        </v-col>
      </v-row>
      <v-row class="d-flex">
        <v-col class="col-4 align-center d-flex">
          Ranking of students in apprenticeship education
        </v-col>
        <v-col class="col-8">
          <a :href="apprenticeStudentsSortedToCsv" download="output.csv"><v-btn color="primary" elevation="1">Download</v-btn></a>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!optionsOutput.separateApprentice">
      <v-row class="d-flex">
        <v-col class="col-4 align-center d-flex">
          Ranking of students in general education and apprenticeship education
        </v-col>
        <v-col class="col-8">
          <a :href="studentsSortedToCsv" download="output.csv"><v-btn color="primary" elevation="1">Download</v-btn></a>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
