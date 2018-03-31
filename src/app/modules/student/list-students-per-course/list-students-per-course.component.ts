import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/course.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-list-students-per-course',
  templateUrl: './list-students-per-course.component.html',
  styleUrls: ['./list-students-per-course.component.css']
})
export class ListStudentsPerCourseComponent implements OnInit {

courseCode: String;
allStudents: any[] = [];
allCourses: any[] = [];
classlist: any[] = [];

  constructor(private Course: CourseService, private Student: StudentService) { }

  ngOnInit() {
  }

  onSearch(){
    this.Student.getAllStudents()
    .subscribe(
      (data: any[]) => {
        let courseCodeToSearch = this.courseCode;
        this.allStudents = data;
        this.allStudents.forEach(student => {
          student.courses.forEach(course => {
            if(course.courseCode == this.courseCode){
              this.classlist.push(student);
            }
          });
        });
        console.log(this.classlist);
      }
    );
  }

}
