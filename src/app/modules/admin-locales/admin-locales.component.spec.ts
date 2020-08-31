import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocalesComponent } from './admin-locales.component';

describe('AdminLocalesComponent', () => {
  let component: AdminLocalesComponent;
  let fixture: ComponentFixture<AdminLocalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLocalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLocalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
