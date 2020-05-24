import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { EnrollmentService } from '../services/enrollment.service';
// import { serialize } from 'v8';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userModel = new User('foram', '123456789');
  submitted = false;
  errorMsg = '';

  constructor(private enrollmentService: EnrollmentService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    // console.log(this.userModel);
    this.submitted = true;
    this.enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success!', data),
        error => this.errorMsg = error.statusText
      )
  }
}
