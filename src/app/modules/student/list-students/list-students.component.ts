import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  students: any[];

  constructor(private Student: StudentService) { }

  ngOnInit() {
    this.Student.getAllStudents()
    .subscribe(
      (data: any[]) => this.students = data
    );
  }

}
