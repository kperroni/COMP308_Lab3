import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

getAllStudents(){
  return this.http.get('/api/student');
}

addCourseToStudent(body){
  return this.http.put('/api/student/'+localStorage.getItem('studentId'), body);
}

getCourseRegistered(){
  return this.http.get('/api/student/'+localStorage.getItem('studentId')+'/courses');
}
}
