import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlageUniteComponent } from './list-plage-unite.component';

describe('ListPlageUniteComponent', () => {
  let component: ListPlageUniteComponent;
  let fixture: ComponentFixture<ListPlageUniteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlageUniteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlageUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
