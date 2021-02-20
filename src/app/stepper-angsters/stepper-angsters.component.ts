import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalService, ModalRef } from '@momentum-ui/angular';

@Component({
  selector: 'app-stepper-angsters',
  templateUrl: './stepper-angsters.component.html',
  styleUrls: ['./stepper-angsters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperAngstersComponent implements OnInit {
  isLinear = false;
  isCompact = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  showHeader = false;
  sampleData;
  
  public steps = [{
    title: 'Momentum Checkbox',
    //fields: [this.testForm.controls['checkedValues']]
  },
  {
    title: 'Momentum Radio Button',
   // fields: [this.testForm.controls['radioControl']]
  }, {
    title: 'Momentum Toggle & Slider',
   // fields: [this.testForm.controls['toggle'], this.testForm.controls['slider']]
  },
  {
    title: 'Momentum Input',
   // fields: [this.testForm.controls['inputControl']]
  },
  {
    title: 'Disabled Screen',
    disabled: true
  },
  {
    title: 'Form Preview',
   // fields: Object.values(this.testForm.controls)
  }
  ];

  public stepNumber = 0;
  createSelected= true;
  addSelected:boolean;
  sendSelected:boolean;


  constructor(private _formBuilder: FormBuilder, private modalRef: ModalRef) {
    this.sampleData = this.modalRef.data;
   }

  ngOnInit(): void {
    console.log("hi");
    this.firstFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    this.secondFormGroup = new FormGroup({
      password: new FormControl('', Validators.required)
    });

  }
  get email() { return this.firstFormGroup.get('email'); }
  get password() { return this.secondFormGroup.get('password'); }

  onSubmit() {
    // do something here
  }
  onStepChange($event){

  }
  selectCreate(){
    this.createSelected = true;
    this.addSelected = false;
    this.sendSelected = false;
  }

  selectAdd(){
    this.createSelected = false;
    this.addSelected = true;
    this.sendSelected = false;
  }

  selectSend(){
    this.createSelected = false;
    this.addSelected = false;
    this.sendSelected = true;
  }

}
