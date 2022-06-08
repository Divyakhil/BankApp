import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService} from '../services/data.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  acno=""
  pswd=""
  username=""

// form group
  registerForm=this.fb.group({
    acno:'',
    pswd:'',
    username:''
  })
  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  register(){
    var acno=this.acno
    var pswd=this.pswd
    var username=this.username
    const result=this.ds.register(username,acno,pswd)

    if(result){
      alert("Successfully registered")
      this.router.navigateByUrl("")
    }
    else{
      alert("Already Existing User....Please log in!!!!")
      this.router.navigateByUrl("")
    }
  }
}
