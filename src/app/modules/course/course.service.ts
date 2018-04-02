import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable()
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get(environment.apiUrl + '/api/course');
  }

  getACourse(body) {
    return this.http.get(environment.apiUrl + '/api/course/' + body);
  }

}
