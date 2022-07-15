import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aim = 'Perfect Banking Partner';
  accno = 'Account number please';
  acno = '';
  pswd = '';

  db: any = {
    1000: { accno: 1000, username: 'Neer', password: 1000, balance: 5000 },
    1001: { accno: 1001, username: 'Laisha', password: 1001, balance: 5000 },
    1002: { accno: 1002, username: 'Ram', password: 1002, balance: 3000 },
  };

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  });
  constructor(
    private router: Router,
    private ds: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  acnoChange(event: any) {
    this.acno = event.target.value;
    console.log(this.acno);
  }
  pswdChange(event: any) {
    this.pswd = event.target.value;
    console.log(this.pswd);
  }
  login() {
    var acno = this.loginForm.value.acno;
    var pswd = this.loginForm.value.pswd;

    if (this.loginForm.valid) {
      const result = this.ds.login(acno, pswd);

      if (result) {
        alert('Login successful');
        this.router.navigateByUrl('dashboard');
      }
    }
  }
}
// template referencing variable
// login(a:any,p:any){
//     console.log(a.value);

//     var acno=a.value
//     var pswd=p.value
//     let db=this.db

//     if(acno in db){
//       if(pswd == db[acno]["password"]){
//         alert("Login successful")
//       }
//       else{
//         alert("Password incorrect")
//       }

//     }
//     else{
//       alert("User does not exist")
//     }
//   }
