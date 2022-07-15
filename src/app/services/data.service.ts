import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentUser:any
  currentAcno:any

  constructor() {
     this.getDetails()
  }



  // get details from local storage
  getDetails(){
    if(localStorage.getItem("database")){
      this.db=JSON.parse(localStorage.getItem("datbase") || '')
    }
    if(localStorage.getItem("currentUser")){
      this.currentUser=JSON.parse(localStorage.getItem("currentUser") || '')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '')
    }
  }



// save details to local storage
  saveDetails(){
    if(this.db){
      localStorage.setItem("databse",JSON.stringify(this.db))
    }
    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }
  db: any = {
    1000: { accno: 1000, username: 'Neer', password: 1000, balance: 5000,transaction:[] },
    1001: { accno: 1001, username: 'Laisha', password: 1001, balance: 5000, transaction:[]},
    1002: { accno: 1002, username: 'Ram', password: 1002, balance: 3000, transaction:[] },
  };

  login(acno: any, pswd: any) {
    let db = this.db;

    if (acno in db) {
      if (pswd == db[acno]['password']) {
        this.currentUser=db[acno]["username"]
        this.currentAcno=acno
        this.saveDetails()
        return true;
      } else {
        alert('incorrect password');
        return false;
      }
    } else {
      alert('User does not exist');
      return false;
    }
  }
  register(username: any, acno: any, password: any) {
    let db = this.db;

    if (acno in db) {
      return false;
    } else {
      db[acno] = {
        acno,
        username,
        password,
        balance: 0,
        transaction:[]
      };
      console.log(db);
      this.saveDetails()
      return true;
    }
  }
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt);
    let db = this.db;
    if (acno in db) {
      if (password == db[acno]["password"]) {
        db[acno]["balance"] += amount;
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        console.log(db)
        this.saveDetails()
        return db[acno]["balance"];
      }
    } else {
      alert('User doesnot exist.!!');
      return false;
    }
  }
  withdraw(acno: any, password: any, amt: any) {
    var amt1 = parseInt(amt);
    let db = this.db;
    if (acno in db) {
      if (password == db[acno]["password"]) {
        if (amt1 <= db[acno]["balance"]) {
          db[acno]["balance"] -= amt1;
          db[acno].transaction.push({
            type:"DEBIT",
            amount:amt1
          })
          this.saveDetails()
          return db[acno]["balance"];
        } else {
          alert('Insufficient balance');
          return false;
        }
      } else {
        alert('Incorrect password');
        return false;
      }
    } else {
      alert('user doesnot exist');
      return false;
    }
  }

  getTransaction(acno:any){
    return this.db[acno].transaction

  }
}
