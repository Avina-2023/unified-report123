import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.scss'],
})
export class AddJobsComponent implements OnInit {
  addjobsForm: FormGroup;
  industryTypes = [
    'Option 1',
    'Option 2',
    'Option 3',
    // Add more options as needed
  ];
  ctcArray = ['Option 1', 'Option 2', 'Option 3'];
  rangefromArray = ['Option A', 'Option B', 'Option C'];
  rangetoArray = ['Option X', 'Option Y', 'Option Z'];
  // selectedOption: string = 'jobs';
   selectedOption: string = '1';




  constructor(private fb: FormBuilder) {
    // this.addjobsForm = this.fb.group({
    //   fixedctc: [''],
    //   startrangectc: [''],
    //   endrangectc: [''],
    //   ctcOptions: ['1'],
    // });
  }

  ngOnInit(): void {
    // this.getRoute();
    this.formerrorInitialize();
    // this.getIndustryType();

  }
  formerrorInitialize() {
    // const emailregex: RegExp =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.addjobsForm = this.fb.group({

 fixedctc: [''],
      startrangectc: [''],
      endrangectc: [''],
      ctcOptions: ['1'],

      CompanyName: ['', [Validators.required]],
      JobRole: ['', [Validators.required]],
      JobLocation: ['', [Validators.required]],
      JobType: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      keyskill: ['', [Validators.required]],
      lastdate: ['', [Validators.required]],
      url: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(\/\S*)?$/i)
        ]
      ],
       yearPassing: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
          Validators.minLength(4),
          Validators.maxLength(4),
        ]
      ],
      // mobile: [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(10),
      //     Validators.maxLength(10),
      //     Validators.pattern('[1-9]{1}[0-9]{9}'),
      //   ]),
      // ],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
            // ctcOptions: ['1'],

    });
  }
  get CompanyName() {
    return this.addjobsForm.get('CompanyName');
  }
  get JobRole() {
    return this.addjobsForm.get('JobRole');
  }
  get JobLocation() {
    return this.addjobsForm.get('JobLocation');
  }

  get JobType() {
    return this.addjobsForm.get('JobType');
  }

  get degree() {
    return this.addjobsForm.get('degree');
  }

  get specialization() {
    return this.addjobsForm.get('specialization');
  }

  get keyskill() {
    return this.addjobsForm.get('keyskill');
  }
  get lastdate() {
    return this.addjobsForm.get('lastdate');
  }
  get url() {
    return this.addjobsForm.get('url');
  }
  get description() {
    return this.addjobsForm.get('description');
  }
  get requirements() {
    return this.addjobsForm.get('requirements');
  }
  get yearPassing() {
    return this.addjobsForm.get('yearPassing');
  }

}
