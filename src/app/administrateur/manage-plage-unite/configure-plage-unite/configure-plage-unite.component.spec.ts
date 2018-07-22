import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurePlageUniteComponent } from './configure-plage-unite.component';

describe('ConfigurePlageUniteComponent', () => {
  let component: ConfigurePlageUniteComponent;
  let fixture: ComponentFixture<ConfigurePlageUniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurePlageUniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurePlageUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
