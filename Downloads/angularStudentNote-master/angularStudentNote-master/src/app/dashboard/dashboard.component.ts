import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';
import {Teacher} from '../models/teacher';
import {Class} from '../models/class';
import {Note} from '../models/note';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  students: Student[] = [];
  classes: Class[] = [];
  notes: Note[] = [];
  classesOfCurrentTeacher: Class[] = [];
  studentsOfSelectedClass: Student[] = [];
  notesOfSelectedStudent: Note[] = [];
  currentTeacher: Teacher;
  selectedClassId: number;
  selectedStudentId: number;
  isClassSelected: boolean;
  isStudentSelected: boolean;

  constructor(private dataService: DataService) {
    dataService.load();
    this.students = dataService.getStudents();
    this.classes = dataService.getClasses();
    this.notes = dataService.getNotes();
    const currentTeacherId = Number(sessionStorage.getItem('currentUser'));
    this.currentTeacher = dataService.getTeacherById(currentTeacherId);
    this.isClassSelected = false;
    this.isStudentSelected = false;

    this.loadClassOfCurrentTeacher();
  }

  private loadClassOfCurrentTeacher() {
    this.classesOfCurrentTeacher = this.classes.filter(x => x.teacherID === this.currentTeacher.id);
  }

  public showStudentsOfClass(classId) {
    this.selectedClassId = classId;
    this.studentsOfSelectedClass = this.students.filter(student => student.classID === classId);
    this.isClassSelected = true;
  }

  showNotesOfStudent(studentId) {
    this.selectedStudentId = studentId;
    this.isStudentSelected = true;
    this.notesOfSelectedStudent = this.notes.filter(note => note.studentId === studentId);
    this.notesOfSelectedStudent.sort((n1: Note, n2: Note) => {
      if (n1.timestamp > n2.timestamp) {
        return -1;
      }
      if (n1.timestamp < n2.timestamp) {
        return 1;
      }
      return 0;
    });
  }

  addNote(inputText) {
    const note = new Note(new Date().toLocaleString(), (<HTMLTextAreaElement> inputText).value,
      this.selectedStudentId, this.currentTeacher.id, this.currentTeacher.firstName + ' ' + this.currentTeacher.lastName);
    this.dataService.addNote(note);
    this.showNotesOfStudent(this.selectedStudentId);
    (<HTMLTextAreaElement> inputText).value = '';
  }

  getStudentName() {
    const student = this.students.find(x => x.id === this.selectedStudentId);
    return student.firstName + ' ' + student.lastName;
  }

  getClassName() {
    return this.classes.find(x => x.id === this.selectedClassId).stufe;
  }

  ngOnInit() {
  }

}
