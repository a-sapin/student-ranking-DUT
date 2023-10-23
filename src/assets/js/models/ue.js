export class UE {
    constructor(id, header) {
        this.id = id;
        this.header = header;
        this.lessons = new Array();
    }

    addLesson(lesson) {
        this.lessons.push(lesson);
    }

    applyAverage(studentId, average) {
        this.lessons.forEach(lesson => lesson.setGrade(studentId, average));
    }

    removeAverage(studentId) {
        this.lessons.forEach(lesson => lesson.removeGrade(studentId));
    }

    hasAverage(studentId) {
        return this.lessons.map(lesson => lesson.getGrade(studentId) != undefined).reduce((p,c) => p && c);
    }

    getCoefficient() {
        return this.lessons.map(lesson => lesson.coefficient).reduce((res, value) => res + value, 0);
    }
    
    getAverage(studentId) {
        const coefficients = this.getCoefficient();
        const grades = this.lessons.map(lesson => lesson.getGrade(studentId) * lesson.coefficient).reduce((res, value) => res + value, 0);
        return parseFloat((grades/coefficients).toFixed(2));
    }

    getTemporaryCoefficient() {
        return this.lessons.filter(lesson => lesson.forTemporaryAverage).map(lesson => lesson.coefficient).reduce((res, value) => res + value, 0);
    }

    getTemporaryAverage(studentId) {
        const coefficients = this.getTemporaryCoefficient();
        const grades = this.lessons.filter(lesson => lesson.forTemporaryAverage).map(lesson => lesson.getGrade(studentId) * lesson.coefficient).reduce((res, value) => res + value, 0);
        return parseFloat((grades/coefficients).toFixed(2));
    }
}