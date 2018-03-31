import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-student-courses',
  templateUrl: './list-student-courses.component.html',
  styleUrls: ['./list-student-courses.component.css']
})
export class ListStudentCoursesComponent implements OnInit {

coursesRegistered: any[] = [];

  constructor(private Student: StudentService) { }

  ngOnInit() {
    this.Student.getCourseRegistered()
      .subscribe(
        (data: any[]) => 
          this.coursesRegistered = data       
      );

  }

}
