import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) {
    this.addjobsForm = this.fb.group({
      industryType: [''], // Initialize the form control for the select element
    });
  }

  ngOnInit(): void {
    // this.getRoute();
    this.formerrorInitialize();
    // this.getIndustryType();
  }
  formerrorInitialize() {
    const emailregex: RegExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.addjobsForm = this.fb.group({
      CompanyName: ['', [Validators.required]],
      JobRole: ['', [Validators.required]],
      //   [
      //   '',
      //   Validators.compose([
      //     Validators.required,
      // Validators.minLength(4),
      // Validators.maxLength(4),
      // Validators.pattern('[1-9]{1}[0-9]{3}'),
      //   ]),
      // ],
      JobLocation: ['', [Validators.required]],
      JobType: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      keyskill: ['', [Validators.required]],
      lastdate: ['', [Validators.required]],
      url: ['', [Validators.required, this.urlValidator()]],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[1-9]{1}[0-9]{9}'),
        ]),
      ],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
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

  urlValidator(): Validators {
    return (control) => {
      if (control.value) {
        // Regular expression to validate URLs
        const urlPattern = /^(https?:\/\/)?([\w\d.-]+)\.([a-z]{2,})(\/\S*)?$/i;

        if (!urlPattern.test(control.value)) {
          // Return a validation error if URL is invalid
          return { invalidUrl: true };
        }
      }

      // Return null if the URL is valid or empty
      return null;
    }
  }
}
