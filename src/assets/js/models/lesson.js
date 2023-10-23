export class Lesson {
    constructor(id, header, coefficient, forTemporaryAverage) {
        this.id = id;
        this.header = header;
        this.coefficient = coefficient;
        this.forTemporaryAverage = forTemporaryAverage;
        this.grades = new Map();
    }

    setGrade(studentId, grade) {
        this.grades.set(studentId, grade);
    }

    removeGrade(studentId) {
        this.grades.delete(studentId);
    }

    getGrade(studentId) {
        return this.grades.has(studentId) ? this.grades.get(studentId) : undefined;
    }
}