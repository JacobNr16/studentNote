import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';
import {Teacher} from '../models/teacher';
import {Class} from '../models/class';
import {Note} from '../models/note';
import {noAnnotationError} from "@angular/core/src/di/reflective_errors";

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
  selectedStudentId: number;

  constructor(private dataService: DataService) {
    dataService.load();
    this.students = dataService.getStudents();
    this.classes = dataService.getClasses();
    this.notes = dataService.getNotes();
    const currentTeacherId = Number(sessionStorage.getItem('currentUser'));
    this.currentTeacher = dataService.getTeacherById(currentTeacherId);

    this.loadClassOfCurrentTeacher();
  }

  private loadClassOfCurrentTeacher() {
    this.classesOfCurrentTeacher = this.classes.filter(x => x.teacherID === this.currentTeacher.id);
  }

  public showStudentsOfClass(classId) {
    this.studentsOfSelectedClass = this.students.filter(student => student.classID === classId);
  }

  showNotesOfStudent(studentId) {
    this.selectedStudentId = studentId;
    this.notesOfSelectedStudent = this.notes.filter(note => note.studentId === studentId);
  }

  addNote(inputText) {
    const note = new Note(new Date().toLocaleString(), (<HTMLTextAreaElement> inputText).value,
      this.selectedStudentId, this.currentTeacher.id, this.currentTeacher.firstName + ' ' + this.currentTeacher.lastName);
    this.dataService.addNote(note);
    this.showNotesOfStudent(this.selectedStudentId);
    (<HTMLTextAreaElement> inputText).value = '';
  }

  ngOnInit() {
  }

}
