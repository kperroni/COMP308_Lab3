import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { CourseService } from '../../course/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

registeredCourses: any[] = [];
dropdownLegendCourse: String = "Select Course";
dropdownLegendSection: String = "Select Section";
selectedCourse: any;
selectedSection: any;
show: boolean = false;
sections: any[] = [];
allCourses: any[] = [];

  constructor(private Student: StudentService, private Course: CourseService) { }

  ngOnInit() {
    this.Student.getCourseRegistered()
    .subscribe(
      (data: any[]) => this.registeredCourses = data
    );

    this.Course.getAllCourses()
    .subscribe(
      (data: any[]) => this.allCourses = data
    );
    
  }

  onSelectCourse(courseId, courseCode, courseName){
    this.sections = [];
    this.allCourses.forEach(course => {
      if (course.courseCode === courseCode) {
        this.dropdownLegendCourse = course.courseCode + ' - ' + course.courseName;
        this.sections.push(course.section);
        this.selectedCourse = course.courseCode;
        this.dropdownLegendSection = "Select Section";
        this.selectedSection = "";
      }
    });
    this.show = true;
  }

  onSelectedSection(section){
    this.selectedSection = this.dropdownLegendSection = section;
  }

  onUpdate(){
    let newRegisteredCourses: any[] = [];
    this.registeredCourses.forEach(course => {
      if(course.courseCode == this.selectedCourse && course.section != this.selectedSection) {
        this.allCourses.forEach(courseToAdd => {
          if(courseToAdd.courseCode == this.selectedCourse && courseToAdd.section == this.selectedSection){
            newRegisteredCourses.push(courseToAdd._id);
          }
        }); 
      }
      else{
        newRegisteredCourses.push(course._id);
      }
        this.Student.getAStudent()
          .subscribe(
            (data: any) => {
              data.courses = newRegisteredCourses;
              this.Student.updateStudent({courses: data.courses})
                .subscribe(
                  (data: any) => console.log(data),
                  (error: any) => console.log(error)
                );
            }
          );   
    });
  }
}
