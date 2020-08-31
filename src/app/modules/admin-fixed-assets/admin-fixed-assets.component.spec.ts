import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFixedAssetsComponent } from './admin-fixed-assets.component';

describe('AdminFixedAssetsComponent', () => {
  let component: AdminFixedAssetsComponent;
  let fixture: ComponentFixture<AdminFixedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFixedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
