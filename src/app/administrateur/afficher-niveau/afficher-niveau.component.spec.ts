import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherNiveauComponent } from './afficher-niveau.component';

describe('AfficherNiveauComponent', () => {
  let component: AfficherNiveauComponent;
  let fixture: ComponentFixture<AfficherNiveauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherNiveauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
