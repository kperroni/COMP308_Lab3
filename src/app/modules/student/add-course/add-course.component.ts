import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course/course.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

allCourses: any[];
uniqueCourses: any[];
sections: any[] = [];
dropdownLegendCourse: String = "Select Course";
dropdownLegendSection: String = "Select Section";
show: boolean = false;
selectedCourse: String = "";
selectedSection: String = "";


  constructor(private Course: CourseService, private Student: StudentService) { }

  ngOnInit() {
    this.Course.getAllCourses()
    .subscribe(
      (data: any[]) => {
        this.allCourses = data;
        this.uniqueCourses = this.allCourses.filter((obj, pos, arr) => {
          return arr.map(mapObj => mapObj['courseCode']).indexOf(obj['courseCode']) === pos;
      });
      }    
    );
  }

  onSelectCourse(courseCode){
    this.sections = [];
    this.allCourses.forEach(course => {
      if(course.courseCode === courseCode){
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

  onRegister(){
    this.allCourses.forEach(course => {
      if(course.courseCode == this.selectedCourse && course.section == this.selectedSection){
        this.Student.addCourseToStudent({courses: course._id})
        .subscribe(
          (data: any) => console.log(data),
          (error: any) => console.log(error)
        );
      } 
    });
  }
}
