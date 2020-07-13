import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../services/enrollment.service';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// import { serialize } from 'v8';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // userModel = new User('foram', '123456789');
  // userModel: User;
  submitted = false;
  errorMsg = '';

  formModel = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['home']);
    }
  }

  onSubmit(form: NgForm){
    // console.log(this.userModel);
    this.loginService.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        alert('login successfully ');
        this.router.navigate(['home']);
      },
       err => {
        if (err.status === 400){
          this.toastr.error('Incorrect username or password', 'Authentication falied');
          alert('Incorrect username or password!');
        }
        else{
          console.log(err);
          alert('Oops! Some errors occurs. Please, Try again! ');
        }

       }
    );
    this.submitted = true;
    // this.enrollmentService.enroll(this.userModel)
    //   .subscribe(
    //     data => console.log('Success!', data),
    //     error => this.errorMsg = error.statusText
    //   );
  }
}
