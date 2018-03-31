import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-list-courses',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.css']
})
export class ListCoursesComponent implements OnInit {

courses: any[];

  constructor( private Course: CourseService) { }

  ngOnInit() {

    this.Course.getAllCourses()
    .subscribe(
      (data: any[]) => this.courses = data
    );
  }

}
