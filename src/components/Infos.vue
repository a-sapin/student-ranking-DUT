<template>
  <v-container>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Informations</v-toolbar-title>
      </v-toolbar>
      <v-tabs vertical class="my-tabs">
        <v-tab>
          <v-icon left> {{ icons.mdiMessage }} </v-icon>
          Introduction
        </v-tab>
        <v-tab>
          <v-icon left> {{ icons.mdiSchool }} </v-icon>
          Tutorial
        </v-tab>
        <v-tab>
          <v-icon left> {{ icons.mdiCog }} </v-icon>
          Configuration
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                Ranking students is a project of the IUT of Nantes tutored by G. Nachouki.
                This project was carried out and is maintained by second year students.
              </p>
              <p>
                It is a static single page site developed with VueJS and Vuetify.
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text class="pb-0">
              <p>After adapting the configuration to the format of the input files, follow theses few steps.</p>

              <h6 class="text-h6">Import files</h6>
              <p>Import semester ranking files as .csv, wait until files to finish to be verified. For each file the result can be:</p>
              <ul>
                <li>Success: number of student found displayed</li>
                <li>Error: the file doesn't have all semester headers, and other headers required (see #Config) change the config or file header to make them match.</li>
              </ul>

              <h6 class="text-h6">Solve conflicts (optional)</h6>
              <p>In the case of a student who has grades for the last semester but he doesn't have for others, he will be listed in conflicts in order to complete missing ue grades.</p>
              <p>Enter a grade between 0 and 20 included foreach ue of the conflict student which will be applied to each lesson of the ue.</p>
              
              <h6 class="text-h6">Output options</h6>
              <p>Choose output and ranking options, severals options are offered:</p>
              <ul>
                <li>Rank students by their temporary or final average</li>
                <li>Group or separate apprentice and general students</li>
                <li>Choose the output file extension (csv, ods, xls)</li>
              </ul>

              <h6 class="text-h6">Download ranking files</h6>
              <p>
                Download the one or two generated files, depend on if separate option has been activate
              </p>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <p>
                To change the default configuration of expected input modify the "src/assets/config.json" file by following this model:
              </p>
              <h6 class="text-h6">Semester</h6>
              <ul>
                <li>id (String) Semester id, must be different foreach (ex: s1, s2...)</li>
                <li>name (String) Semester name, text displayed in the file input section (ex: Semestre 1, Semestre 2...)</li>
                <li>finalSemester (Boolean) Is final semester of the year ? only one can be final</li>
                <li>inputs (Array) Semester inputs displayed in the file input section (See Input)</li>
                <li>ues (Array) Semester ues (See UE)</li>
                <li>extras (Array) Semester extras (See Extra)</li>
              </ul>
              <h6 class="text-h6">Input</h6>
              <p>
                An input is own by a semester, each input of a semester will represented by a row under the semester in the file input section.
              </p>
              <ul>
                <li>id (String) Input id, must be different foreach (ex: s1g, s1a...)</li>
                <li>name (String) Input name, text displayed to describe the input (ex: Formation générale, Formation en apprentissage...)</li>
                <li>apprentice (Boolean) Is an input for apprentice students ?</li>
              </ul>
              <h6 class="text-h6">UE</h6>
              <p>
                An UE is a group of lesson the average of them are displayed in the output file.
              </p>
              <ul>
                <li>id (String) UE id, displayed at header in the output file, must be different foreach (ex: UE 11, UE 12...)</li>
                <li>header (String) UE header in the input file, must be unique, respect the case (ex: UE 11, UE 12...)</li>
                <li>lessons (Array) UE lessons (See Lesson)</li>
              </ul>
              <h6 class="text-h6">Extra</h6>
              <ul>
                <li>id (String) Extra id, must be different foreach (ex: sport, chess...)</li>
                <li>header (String) Extra header in the input file, must be unique, respect the case (ex: SPORT, CHESS...)</li>
               <li>amount (Number) Amount of point add the the semester grade at the end of the grade calculation (ex: 0.2, 1...)</li>
              </ul>
              <h6 class="text-h6">Lesson</h6>
              <ul>
                <li>id (String) Lesson id, must be different foreach (ex: M3101, M3102...)</li>
                <li>header (String) Lesson header in the input file, must be unique, respect the case (ex: M3101, M3102...)</li>
                <li>coefficient (Number) Coeficient of the lesson in for the semester (ex: 2, 1.5...)</li>
                <li>forTemporaryAverage (Boolean) Is a lesson to count for the temporary average ?</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<style scoped>
div.my-tabs [role="tab"] {
  justify-content: flex-start;
}
</style>
<script>
import { mdiMessage, mdiSchool, mdiCog } from "@mdi/js";

export default {
  name: "Infos",
  data() {
    return {
      icons: {
        mdiMessage,
        mdiSchool,
        mdiCog,
      },
    };
  },
};
</script>