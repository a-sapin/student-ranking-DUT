export class Iut {
    constructor() {
        this.semesters = new Array();
    }

    addSemester(semester) {
        this.semesters.push(semester);
    }

    getCoefficient() {
        return this.semesters.length;
    }

    getAverage(studentId) {
        const coefficients = this.getCoefficient();
        const total = this.semesters.map(semester => semester.getAverage(studentId)).reduce((res, value) => res + value, 0);
        return parseFloat((total/coefficients).toFixed(2));
    }

    getTemporaryAverage(studentId) {
        const coefficients = this.getCoefficient();
        const total = this.semesters.map(semester => semester.getTemporaryAverage(studentId)).reduce((res, value) => res + value, 0);
        return parseFloat((total/coefficients).toFixed(2));
    }
}