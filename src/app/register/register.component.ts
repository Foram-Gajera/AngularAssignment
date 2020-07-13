import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/usernamevalidator';
import { PasswordValidator } from '../shared/passwordvalidator';
import { RegistrationService } from '../services/registration.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  get username(){
    return this.registrationForm.get('username');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get cpassword(){
    return this.registrationForm.get('cpassword');
  }

  // registerationForm = new FormGroup({
  //   username: new FormControl('Foram'),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   category: new FormControl(''),
  //   shift: new FormControl(''),
  //   emailUpdates: new FormControl('')
  // });


  constructor(private fb: FormBuilder, private registrationService: RegistrationService,
              private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]],
      cpassword: ['', [Validators.required, Validators.pattern]],
    }, { validators: PasswordValidator });

    // this.registrationForm.get('emailUpdates').valueChanges
    // .subscribe(checkValue => {
    //   const email = this.registrationForm.get('email');
    //   if (checkValue){
    //     email.setValidators(Validators.required);
    //   }
    //   else{
    //     email.clearValidators();
    //   }
    //   email.updateValueAndValidity();
    // });
  }

  loadApiData(){
    this.registrationForm.patchValue({
      username: 'foramgajera',
      email: 'foramgajera@gmail.com',
      password: '123456789',
      cpassword: '123456789'
    });
  }

  clearData(){
    this.registrationForm.reset();
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.valid);
    this.registrationService.register(this.registrationForm.value)
    .subscribe(
      response =>
      {
        if (response){
          if (response.succeded){
            console.log('Success!' , response);
            alert('register successfully!');
          }
          else{
            console.log(response.errors[0].description);
            alert(response.errors[0].description);
          }
        }
      },
      error => console.log('error!', error)
    );
    this.router.navigate(['/home']);
  }
}
