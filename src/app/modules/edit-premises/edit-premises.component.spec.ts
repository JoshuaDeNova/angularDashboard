import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPremisesComponent } from './edit-premises.component';

describe('EditPremisesComponent', () => {
  let component: EditPremisesComponent;
  let fixture: ComponentFixture<EditPremisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPremisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPremisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
