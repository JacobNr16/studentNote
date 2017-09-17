import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/dataService';
import {Student} from '../models/student';
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

  constructor(private dataService: DataService) {
    dataService.load();
    this.notes = dataService.getNotes();
    this.students = dataService.getStudents();
    this.teachers = dataService.getTeachers();
  }

  getNameOfStudent(studentId) {
    const student = this.students.find(x => (<Student> x).id === studentId);
    return student.firstName + ' ' + student.lastName;
  }

  editNote(noteId, inputNote, inputTimestamp, inputTeacherName, inputStudentName, tableAction) {
    const index = this.getIndexOfNote(noteId);
    if (index != null) {
      this.notes[index].isEditable = true;
      (<HTMLTextAreaElement> inputNote).removeAttribute('readonly');

      (<HTMLInputElement> inputNote).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> inputTimestamp).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> inputTeacherName).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> inputStudentName).style.backgroundColor = '#ff3333';
      (<HTMLInputElement> tableAction).style.backgroundColor = '#ff3333';
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

  updateNote(inputNote, noteId, inputTimestamp, inputTeacherName, inputStudentName, tableAction) {
    const index = this.getIndexOfNote(noteId);
    if (index != null) {
      this.notes[index].isEditable = false;
      (<HTMLTextAreaElement> inputNote).setAttribute('readonly', 'readonly');

      (<HTMLInputElement> inputNote).style.backgroundColor = '';
      (<HTMLInputElement> inputTimestamp).style.backgroundColor = '';
      (<HTMLInputElement> inputTeacherName).style.backgroundColor = '';
      (<HTMLInputElement> inputStudentName).style.backgroundColor = '';
      (<HTMLInputElement> tableAction).style.backgroundColor = '';

      this.dataService.updateNote(noteId, (<HTMLTextAreaElement> inputNote).value);
      this.notes = this.dataService.getNotes();
    }
  }

  deleteNote(noteId) {
    this.dataService.deleteNote(noteId);
  }

  ngOnInit() {
  }

}
