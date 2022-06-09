import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  acno = '';
  pswd = '';
  username = '';

  // form group
  registerForm = this.fb.group({
    acno: [''],
    pswd: [''],
    username: ['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]
  })
  constructor(
    private ds: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    var acno = this.registerForm.value.acno;
    var pswd = this.registerForm.value.pswd;
    var username = this.registerForm.value.username;

    

    if (this.registerForm.valid){
      const result = this.ds.register(username, acno, pswd);
      if (result) {
        alert('Successfully registered');
        this.router.navigateByUrl('');
      } else {
        alert('Already Existing User....Please log in!!!!');
        this.router.navigateByUrl('');
      } 
    }
      else{
        alert("Invalid form")
      }
    
    
  }
}
