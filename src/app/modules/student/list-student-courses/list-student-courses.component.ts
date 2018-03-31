import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CourseService } from '../../course/course.service';

@Component({
  selector: 'app-list-student-courses',
  templateUrl: './list-student-courses.component.html',
  styleUrls: ['./list-student-courses.component.css']
})
export class ListStudentCoursesComponent implements OnInit {

  courseCodes: any[] = [];
  allCourses: any[] = [];
  coursesRegistered: any[] = [];
  constructor(private Student: StudentService, private Course: CourseService) { }

  ngOnInit() {
    this.Student.getCourseRegistered()
      .subscribe(
        (data: any[]) => {
          this.courseCodes = data;
          this.Course.getAllCourses()
            .subscribe(
              (data: any[]) => {
                this.allCourses = data;
                this.allCourses.forEach(course => {
                  this.courseCodes.forEach(studentCourse => {
                    if(course._id === studentCourse){
                      this.coursesRegistered.push(course);
                    }
                  });
                });
              }
            );
        }
      );

  }

}
