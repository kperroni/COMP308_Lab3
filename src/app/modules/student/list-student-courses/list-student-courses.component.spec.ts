import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentCoursesComponent } from './list-student-courses.component';

describe('ListStudentCoursesComponent', () => {
  let component: ListStudentCoursesComponent;
  let fixture: ComponentFixture<ListStudentCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
