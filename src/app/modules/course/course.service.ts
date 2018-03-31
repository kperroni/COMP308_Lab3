import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

getAllCourses(){
  return this.http.get('/api/course');
}
}
