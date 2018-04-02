import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class StudentService {

  constructor(private http: HttpClient) { }

getAllStudents(){
  return this.http.get(environment.apiUrl + '/api/student');
}

updateStudent(body){
  return this.http.put(environment.apiUrl + '/api/student/'+localStorage.getItem('studentId'), body);
}

getCourseRegistered(){
  return this.http.get(environment.apiUrl + '/api/student/'+localStorage.getItem('studentId')+'/courses');
}

getAStudent(){
  return this.http.get(environment.apiUrl + '/api/student/'+localStorage.getItem('studentId'));
}
}
