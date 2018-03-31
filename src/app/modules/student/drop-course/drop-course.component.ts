import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-drop-course',
  templateUrl: './drop-course.component.html',
  styleUrls: ['./drop-course.component.css']
})
export class DropCourseComponent implements OnInit {

registeredCourses: any[] = [];
dropdownLegendCourse: String = "Select Course";
selectedCourse: any;

  constructor(private Student: StudentService) { }

  ngOnInit() {
    this.Student.getCourseRegistered()
    .subscribe(
      (data: any[]) => this.registeredCourses = data
    );
  }

  onSelectCourse(courseId, courseCode, courseName){
    this.dropdownLegendCourse = courseCode + "-"+courseName;
    this.selectedCourse = courseId;
  }

  onDropCourse(){
  let newRegisteredCourses: any[] = [];
  this.registeredCourses.forEach(course => {
    if(course._id != this.selectedCourse){
      newRegisteredCourses.push(course);
    }
  });

  this.Student.updateStudent({courses: newRegisteredCourses})
  .subscribe(
    (data: any) => {
      console.log(data); 
      this.ngOnInit(); this.dropdownLegendCourse = "Select Course"; 
      this.selectedCourse = "";
    },
    (error: any) => console.log(error)
  ); 
    }
  }