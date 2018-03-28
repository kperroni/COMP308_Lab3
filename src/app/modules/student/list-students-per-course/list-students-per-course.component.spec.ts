import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudentsPerCourseComponent } from './list-students-per-course.component';

describe('ListStudentsPerCourseComponent', () => {
  let component: ListStudentsPerCourseComponent;
  let fixture: ComponentFixture<ListStudentsPerCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStudentsPerCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStudentsPerCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
