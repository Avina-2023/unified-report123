import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-skill-bulk-upload',
  templateUrl: './skill-bulk-upload.component.html',
  styleUrls: ['./skill-bulk-upload.component.scss']
})
export class SkillBulkUploadComponent implements OnInit {

  tabSelect=1;
  fileName = '';
  file:any;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeTab(value){
    this.tabSelect = value.index;
  }

  nextTab(){
    this.tabSelect = this.tabSelect+1;
  }

  previousTab(){
    this.tabSelect = this.tabSelect-1;
  }

  onFileSelected(event) {
    this.file = File = event.target.files[0];;

    if (this.file) {

        this.fileName = this.file.name;

        // const formData = new FormData();

        // formData.append("thumbnail", this.file);


        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
}

cancleUpload(){
  this.fileName="";
  this.file="";
}
 
}
