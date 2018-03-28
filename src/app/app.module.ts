import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { AddCourseComponent } from './modules/student/add-course/add-course.component';
import { UpdateCourseComponent } from './modules/student/update-course/update-course.component';
import { DropCourseComponent } from './modules/student/drop-course/drop-course.component';
import { ListCoursesComponent } from './modules/course/list-courses/list-courses.component';
import { ListStudentsComponent } from './modules/student/list-students/list-students.component';
import { ListStudentCoursesComponent } from './modules/student/list-student-courses/list-student-courses.component';
import { ListStudentsPerCourseComponent } from './modules/student/list-students-per-course/list-students-per-course.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addCourse',
    component: AddCourseComponent
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: "full"
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCourseComponent,
    UpdateCourseComponent,
    DropCourseComponent,
    ListCoursesComponent,
    ListStudentsComponent,
    ListStudentCoursesComponent,
    ListStudentsPerCourseComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
