import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherEnseignantComponent } from './afficher-enseignant.component';

describe('AfficherEnseignantComponent', () => {
  let component: AfficherEnseignantComponent;
  let fixture: ComponentFixture<AfficherEnseignantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherEnseignantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
