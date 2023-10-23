const csv = require('csv-parser');
const fileReaderStream = require('filereader-stream');
const config = require('../../config.json');
import { Student } from "../models/student";

export class StudentUtils {

    static fromFilesFillModel(semestersInputs, semestersModel, vue) {
        const promises = new Array();
        semestersInputs.forEach((semesterInput) => {
            const semesterModel = semestersModel.semesters.filter(semester => semesterInput.id == semester.id)[0];
            semesterInput.inputs.forEach((input) => {
                promises.push(this.fillModel(semesterModel, input.file, vue));
                if (input.apprentice == true) {
                    promises.push(this.setApprentice(input.file, vue));
                }
            });
        });
        return Promise.all(promises);
    }

    static checkHeaders(semesterId, file) {
        return new Promise((resolve, reject) => {
            let studentsRes = 0;
            let once = false;
            fileReaderStream(file)
            .on('error', () => {
                reject("Error when opening the file.")
            })
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                if (row[config.rank.header] != '') {
                    if (!once) {
                        const headers = [config.id.header, config.name.header];
                        const semester = config.semesters.filter(sem => sem.id == semesterId)[0];
                        semester.ues.forEach(ue => {
                            headers.push(ue.header);
                            ue.lessons.forEach(lesson => {
                                headers.push(lesson.header);
                            });
                        });
                        semester.extras.forEach(extra => {
                            headers.push(extra.header);
                        });
                        headers.forEach(header => {
                            if (!(header in row)) {
                                reject("Error: Bad headers")
                            }
                        })
                        once = true;
                    }
                    studentsRes++;
                }
            })
            .on('end', () => {
                resolve(studentsRes);
            });
        })
    }

    static fillModel(semester, file, vue) {
        return new Promise(resolve => {
            fileReaderStream(file)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                if (row[config.rank.header] != '') {
                    let student = undefined;
                    vue.students.forEach(studente => {
                        if (studente.id == row[config.id.header]) {
                            student = studente;
                        }
                    });
                    if (!student) {
                        student = new Student(row[config.id.header]);
                        vue.$set(vue.students, vue.students.length, student);
                    }
                    student.name = row[config.name.header];
                    semester.ues.forEach(ue => {
                        ue.lessons.forEach(lesson => {
                            lesson.setGrade(student.id, isNaN(parseFloat(row[lesson.header])) ? (isNaN(parseFloat(row[ue.header])) ? 0 : parseFloat(row[ue.header])) : parseFloat(row[lesson.header]));
                        });
                    });
                    semester.extras.forEach(extra => {
                        extra.setGrade(student.id, isNaN(parseFloat(row[extra.header])) ? 0 : parseFloat(row[extra.header]));
                    });
                }
            })
            .on('end', () => {
                resolve();
            });
        })
    }

    static setApprentice(file, vue) {
        return new Promise(resolve => {
            fileReaderStream(file)
            .pipe(csv({ separator: ';' }))
            .on('data', (row) => {
                if (row[config.rank.header] != '') {
                    let student = undefined;
                    let index = 0;
                    vue.students.forEach((studente, inde) => {
                        if (studente.id == row[config.id.header]) {
                            index = inde;
                            student = studente;
                        }
                    });
                    if (!student) {
                        student = new Student(row[config.id.header]);
                        index = vue.students.length;
                        vue.$set(vue.students, vue.students.length, student);
                    }
                    student.apprentice = true;
                    vue.$set(vue.students, index, student);
                }
            })
            .on('end', () => {
                vue.students.forEach((student, index) => {
                    if (!student.apprentice) {
                        student.apprentice = false;
                        vue.$set(vue.students, index, student);
                    }
                })
                resolve();
            });
        })
        
    }
}