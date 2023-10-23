export class Semester {
    constructor(id) {
        this.id = id;
        this.ues = new Array();
        this.extras = new Array();
    }
    
    addUE(ue) {
        this.ues.push(ue);
    }

    addExtra(extra) {
        this.extras.push(extra);
    }

    getBonus(studentId) {
        return this.extras.filter(extra => extra.getGrade(studentId) != 0).map(extra => extra.coefficient).reduce((res, value) => res + value, 0);
    }

    hasAverage(studentId) {
        return this.ues.map(ue => ue.hasAverage(studentId)).reduce((p,c) => p && c);
    }

    getCoefficient() {
        return this.ues.map(ue => ue.getCoefficient()).reduce((res, value) => res + value, 0);
    }
    
    getAverage(studentId) {
        const coefficients = this.getCoefficient();
        const grades = this.ues.map(ue => ue.getAverage(studentId) * ue.getCoefficient(studentId)).reduce((res, value) => res + value, 0);
        return parseFloat((grades/coefficients + this.getBonus(studentId)).toFixed(2));
    }

    getTemporaryCoefficient() {
        return this.ues.map(ue => ue.getTemporaryCoefficient()).reduce((res, value) => res + value, 0);
    }

    getTemporaryAverage(studentId) {
        const coefficients = this.getTemporaryCoefficient();
        const grades = this.ues.map(ue => ue.getTemporaryAverage(studentId) * ue.getTemporaryCoefficient(studentId)).reduce((res, value) => res + value, 0);
        return parseFloat((grades/coefficients + this.getBonus(studentId)).toFixed(2));
    }
}