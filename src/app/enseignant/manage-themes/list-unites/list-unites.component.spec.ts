import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnitesComponent } from './list-unites.component';

describe('ListUnitesComponent', () => {
  let component: ListUnitesComponent;
  let fixture: ComponentFixture<ListUnitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUnitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUnitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
