import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';
import {Teacher} from '../models/teacher';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notizen',
  templateUrl: './notizen.component.html',
  styleUrls: ['./notizen.component.css']
})
export class NotizenComponent implements OnInit {

  public notes;
  public students;
  public teachers;

  constructor(private dataService: DataService, private router: Router) {
    dataService.load();
    this.notes = dataService.getNotes();
    this.students = dataService.getStudents();
    this.teachers = dataService.getTeachers();
  }

  getNameOfStudent(studentId) {
    const student = this.students.find(x => (<Student> x).id === studentId);
    return student.firstName + ' ' + student.lastName;
  }

  editNote(noteId, inputNote) {
    const index = this.getIndexOfNote(noteId);
    if (index != null) {
      this.notes[index].isEditable = true;
      (<HTMLTextAreaElement> inputNote).removeAttribute('readonly');
    }
  }

  getIndexOfNote(noteId) {
    for (let index = 0; index < this.notes.length; index++) {
      if (this.notes[index].id === noteId) {
        return index;
      }
    }
    return null;
  }

  updateNote(inputNote, noteId) {
    const index = this.getIndexOfNote(noteId);
    if (index != null) {
      this.notes[index].isEditable = false;
      (<HTMLTextAreaElement> inputNote).setAttribute('readonly', 'readonly');

      this.dataService.updateNote(noteId, (<HTMLTextAreaElement> inputNote).value)
    }
  }

  deleteNote(noteId) {
    this.dataService.deleteNote(noteId);
  }

  reloadPage() {
    this.router.navigateByUrl(this.router.url);
  }

  ngOnInit() {
  }

}
