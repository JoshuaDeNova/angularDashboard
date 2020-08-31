import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFixedAssetsComponent } from './edit-fixed-assets.component';

describe('EditFixedAssetsComponent', () => {
  let component: EditFixedAssetsComponent;
  let fixture: ComponentFixture<EditFixedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFixedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
