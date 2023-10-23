import { Iut } from '../models/iut';
const { Lesson } = require('../models/lesson');
const { UE } = require('../models/ue');
const { Semester } = require('../models/semester');
const config = require('../../config.json');

function getModel() {
    const iut = new Iut();
    let semester, ue, lesson, extra;

    config.semesters.forEach(sem => {
        semester = new Semester(sem.id);
        semester.finalSemester = sem.finalSemester;
        iut.addSemester(semester);
        sem.ues.forEach(u => {
            ue = new UE(u.id, u.header);
            semester.addUE(ue);
            u.lessons.forEach(les => {
                lesson = new Lesson(les.id, les.header, les.coefficient, les.forTemporaryAverage);
                ue.addLesson(lesson);
            });
        });
        sem.extras.forEach(ext => {
            extra = new Lesson(ext.id, ext.header, ext.amount, true);
            semester.addExtra(extra);
        });
    });
    return iut;
}

export const ModelSemesters = {
    getModelSemesters: function() {
        return getModel();
    }
};