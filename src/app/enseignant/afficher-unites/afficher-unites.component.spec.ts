import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherUnitesComponent } from './afficher-unites.component';

describe('AfficherUnitesComponent', () => {
  let component: AfficherUnitesComponent;
  let fixture: ComponentFixture<AfficherUnitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherUnitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherUnitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
