import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../shared/usernamevalidator';
import { PasswordValidator } from '../shared/passwordvalidator';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  categories = ['Employee', 'trainee'];

  get username(){
    return this.registrationForm.get('username');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get alternetphone() {
    return this.registrationForm.get('alternetphone') as FormArray;
  }

  addAlternetPhone(){
    this.alternetphone.push(this.fb.control(''));
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

  get shift(){
    return this.registrationForm.get('shift');
  }

  // registerationForm = new FormGroup({
  //   username: new FormControl('Foram'),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   category: new FormControl(''),
  //   shift: new FormControl(''),
  //   emailUpdates: new FormControl('')
  // });


  constructor(private fb: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/admin/)]],
      phone: ['', [Validators.required, Validators.pattern]],
      alternetphone: this.fb.array([]),
      password: ['', [Validators.required, Validators.pattern]],
      cpassword: ['', [Validators.required, Validators.pattern]],
      category: ['', [Validators.required]],
      shift: ['', Validators.required],
      emailUpdates: false,
      email: ['', [Validators.required, Validators.pattern]],
    }, { validators: PasswordValidator });

    this.registrationForm.get('emailUpdates').valueChanges
    .subscribe(checkValue => {
      const email = this.registrationForm.get('email');
      if (checkValue){
        email.setValidators(Validators.required);
      }
      else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  loadApiData(){
    this.registrationForm.patchValue({
      username: 'foram',
      phone: '9586234714',
      email: 'sdg@sdf.dfg',
      password: '123456789',
      cpassword: '123456789'
    });
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    console.log(this.registrationForm.valid);
    this.registrationService.register(this.registrationForm.value)
    .subscribe(
      response => console.log('Success!' , response),
      error => console.log('Error!' , error)
    );
  }
}
