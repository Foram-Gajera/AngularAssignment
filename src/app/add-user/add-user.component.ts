import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperationService } from '../services/operation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { NewUser } from '../shared/user';
// import { NewUser } from '../shared/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  user: NewUser;
  fieldTextType: boolean;

  // @Input() public uId;
  data: any;

  constructor(private formBuilder: FormBuilder, private operationservice: OperationService,
              private router: Router, private route: ActivatedRoute) { }

  // const id: this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // alert(id);

    if (id){
      this.updateUserData(id);
    }
    else{
      this.addUserData();
    }
  }

  formControls(){
    return this.createForm.controls;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  addUserData(){
    this.createForm = this.formBuilder.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  updateUserData(id){
    // alert('update');
    this.operationservice.getUserById(id).subscribe(
      (data) => {
          this.user = data;
          // alert(this.user);
          this.createForm = this.formBuilder.group({
            id: this.user.id,
            name: [this.user.name, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, Validators.required],
            password: [this.user.password, Validators.required],
          });
      }
    );
    // alert(this.user);
  }

  onSubmit(){

   this.submitted = true;

   if (this.createForm.invalid) {
    return alert('form is invalid');
   }
   else{
    if (this.createForm.value.id === 0){
      // alert('id = 0');
      // console.log(this.createForm.value);
      this.operationservice.postUser(this.createForm.value).subscribe(
       (res: any) => {
         this.createForm.patchValue({id: res.id});
       }
     );
      alert('Successfully added!');
      console.log(this.createForm.value);
     }
     else {
      //  alert(this.createForm.value.id);
      //  alert('edit');
       this.operationservice.putUser(this.createForm.value.id, this.createForm.value).subscribe(
        (res: any) => {
        }
      );
       alert('Successfully updated!');
       console.log(this.createForm.value);
     }
   }
   this.createForm.reset();
   this.submitted = false;
   this.router.navigateByUrl('/user');

  }

  onReset(){
    this.submitted = false;
    this.createForm.reset();
  }
}
