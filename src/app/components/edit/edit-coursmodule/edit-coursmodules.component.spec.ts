import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursmodulesComponent } from '././edit-coursmodules.component';

describe('EditProfComponent', () => {
  let component: EditCoursmodulesComponent;
  let fixture: ComponentFixture<EditCoursmodulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCoursmodulesComponent]
    });
    fixture = TestBed.createComponent(EditCoursmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
