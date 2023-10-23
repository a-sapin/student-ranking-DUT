<script>
export default {
  name: "Conflicts",
  props: ["conflictsInput", "semesterModel"],
  methods: {
    emitValue: function (ue, student, event) {
      if (!isNaN(parseFloat(event))) {
        if (this.rules.min(parseFloat(event)) === true && this.rules.max(parseFloat(event)) === true) {
          ue.applyAverage(student.id, event);
          const ues = this.semesterModel.semesters.map(sem => sem.ues).flat();
          for (const student in this.conflictsInput) {
            for (const u in ues) {
              if (!ues[u].hasAverage(this.conflictsInput[student].id)) {
                this.$emit('update', false);
                return;
              }
            }
          }
          this.$emit('update', true);
          return;
        }
      }
      ue.removeAverage(student.id);
      this.$emit('update', false);
    }
  },
  computed: {
    headers: function () {
      const combinedArray = new Array();
      Array.from(this.semesterModel.semesters)
        .filter((semester) => semester.finalSemester != true)
        .map((semester) => semester.ues)
        .forEach((ues) => {
          combinedArray.push(...ues);
        });

      return combinedArray;
    },
  },

  data: () => ({
    rules: {
      required: value => !!value || 'Required',
      min: v => v >= 0 || 'Min 0',
      max: v => v <= 20 || 'Max 20',
    },
  }),
};
</script>

<template>
  <v-simple-table height="auto">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left" v-for="ue in headers" :key="ue.id">
            {{ ue.id }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in conflictsInput" :key="student.id">
          <td>{{ student.id }}</td>
          <td>{{ student.name }}</td>
          <td v-for="ue in headers" :key="ue.id">
            <v-text-field
            :disabled="ue.hasAverage(student.id)"
            :value="ue.hasAverage(student.id) ? ue.getAverage(student.id) : ''"
            @input="emitValue(ue, student, $event)"
            type="number"
            :rules="[rules.required, rules.min, rules.max]"
            ></v-text-field>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
