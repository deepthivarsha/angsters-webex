import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperAngstersComponent } from './stepper-angsters.component';

describe('StepperAngstersComponent', () => {
  let component: StepperAngstersComponent;
  let fixture: ComponentFixture<StepperAngstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperAngstersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperAngstersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
