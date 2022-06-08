import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  db: any = {
    1000: { accno: 1000, username: 'Neer', password: 1000, balance: 5000 },
    1001: { accno: 1001, username: 'Laisha', password: 1001, balance: 5000 },
    1002: { accno: 1002, username: 'Ram', password: 1002, balance: 3000 },
  };

  login(acno: any, pswd: any) {
    let db = this.db;

    if (acno in db) {
      if (pswd == db[acno]['password']) {
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
      };
      return true;
    }
  }
  deposit(acno: any, password: any, amt: any) {
    var amount = parseInt(amt);
    let db = this.db;
    if (acno in db) {
      if (password == db[acno]['password']) {
        db[acno]['balance'] += amount;
        return db[acno]['balance'];
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
      if (password == db[acno]['password']) {
        if (amt1 <= db[acno]['balance']) {
          db[acno]['balance'] -= amt1;
          return db[acno]['balance'];
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
}
