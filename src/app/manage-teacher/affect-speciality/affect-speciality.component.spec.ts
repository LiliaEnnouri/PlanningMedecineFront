import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectSpecialityComponent } from './affect-speciality.component';

describe('AffectSpecialityComponent', () => {
  let component: AffectSpecialityComponent;
  let fixture: ComponentFixture<AffectSpecialityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectSpecialityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
