import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  id:number=null;
  prod_name:string='';
  prod_categories:string='';
  prod_img:string='';
  prod_price:number=null;
  updated_at:Date=null;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
          let id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'id': [null, Validators.required],
      'prod_name' : [null, Validators.required],
      'prod_categories' : [null, Validators.required],
      'prod_img' : [null, Validators.required],
      'prod_price' : [null, Validators.required],
      'updated_at' : [null, Validators.required]
    });
  }

}
