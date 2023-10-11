import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from './../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  htmlContent_description = '';
  htmlContent_requirement = '';
  employerLogo = '';
  formBuilder: any;
  errorMsgforCmpnyLogo = '';
  employerCmpnyLogoFile: any;
  displayImageUrl = "";
  employerLogoUrl: string;

  productionUrl = environment.SKILL_EDGE_URL == "https://skilledge.lntedutech.com"?true:false;

config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '100px',
    maxHeight: '100px',
    placeholder: 'Type here...',
    translate: 'no',
    sanitize: false,
    toolbarPosition: 'top',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
    };

//   editorConfig = {
//   editable: true, // Set this to 'false' to make the editor read-only
//   spellcheck: true,
//   height: 'auto',
//   minHeight: '100px',
//   placeholder: 'Enter Job Description',
//   translate: 'yes',
//   defaultParagraphSeparator: 'p',
//   defaultFontName: 'Arial',
//   toolbarHiddenButtons: [
//     ['fontName'],
//     ['insertImage'],
//     ['strikeThrough'],
//     ['subscript'],
//     ['superscript'],
//   ],
// };

  constructor(private fb: FormBuilder, private ApiService: ApiService, private toastr: ToastrService) {
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
this.addjobsForm = this.formBuilder.group({
    });
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
      JobTitle: ['', [Validators.required]],
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
   get JobTitle() {
    return this.addjobsForm.get('JobTitle');
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
onEmployerLogoFileSelected(event) {
  this.errorMsgforCmpnyLogo = '';
  this.employerCmpnyLogoFile = event.target.files[0];
   const fd = new FormData();
    fd.append("uploadFile",event.target.files[0]);
    fd.append("type", "profile");
this.ApiService.imageUpload(fd).subscribe((imageData: any) => {
      if (imageData.success == false) {
        this.toastr.warning(imageData.message);
      } else {
        this.employerLogo = event.target.files[0].name;
        if (imageData.data && this.productionUrl == true) {
          this.displayImageUrl = imageData.data + environment.blobToken
        } else if (imageData.data && this.productionUrl == false) {
          this.displayImageUrl = imageData.data
        }
        this.employerLogoUrl = imageData.data;
      }
    }, (err) => {
      this.toastr.warning('Connection failed, Please try again.');
    });

  }
saveForm() {
    // Handle form submission here (e.g., sending data to a server)
    if (this.addjobsForm.valid) {
      // Perform form submission actions
    }
  }

  clearForm() {
    this.addjobsForm.reset(); // This will reset the form to its initial state
  }

}
