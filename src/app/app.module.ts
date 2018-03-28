import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { AddCourseComponent } from './modules/student/add-course/add-course.component';
import { UpdateCourseComponent } from './modules/student/update-course/update-course.component';
import { DropCourseComponent } from './modules/student/drop-course/drop-course.component';
import { ListCoursesComponent } from './modules/course/list-courses/list-courses.component';
import { ListStudentsComponent } from './modules/student/list-students/list-students.component';
import { ListStudentCoursesComponent } from './modules/student/list-student-courses/list-student-courses.component';
import { ListStudentsPerCourseComponent } from './modules/student/list-students-per-course/list-students-per-course.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginService } from './modules/login/login.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'addCourse', component: AddCourseComponent},
  {path: 'listCourses', component: ListCoursesComponent},
  {path: 'dropCourse', component: DropCourseComponent},
  {path: 'listStudentCourses', component: ListStudentCoursesComponent},
  {path: 'updateCourse', component: UpdateCourseComponent},
  {path: 'listStudentsPerCourse', component: ListStudentsPerCourseComponent}, 
  {path: 'listStudents', component: ListStudentsComponent},
  {path: '**', redirectTo: '/login', pathMatch: "full"},
  {path: '', redirectTo: '/login', pathMatch: "full"}
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
    ListStudentsPerCourseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes), FormsModule, HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
