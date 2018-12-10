import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnnotationComponent } from './edit-annotation.component';

describe('EditAnnotationComponent', () => {
  let component: EditAnnotationComponent;
  let fixture: ComponentFixture<EditAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
