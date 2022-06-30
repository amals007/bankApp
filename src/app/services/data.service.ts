import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currentAcno: any;
  currentUser: any;
  db: any = {
    1000: {
      acno: 1000,
      username: 'Neer',
      password: 1000,
      balance: 5000,
      transactions: [],
    },
    1001: {
      acno: 1001,
      username: 'Laisha',
      password: 1001,
      balance: 5000,
      transactions: [],
    },
    1002: {
      acno: 1002,
      username: 'Vipin',
      password: 1002,
      balance: 3000,
      transactions: [],
    },
  };

  constructor(private http: HttpClient) {}

  saveDetails() {
    if (this.db) {
      localStorage.setItem('database', JSON.stringify(this.db));
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno));
    }
  }

  login(acno: any, pswd: any) {
    const data = {
      acno,
      pswd,
    };
    // asynchronous
    return this.http.post('http://localhost:3000/login', data);
  }

  //register
  register(username: any, acno: any, password: any) {
    const data = {
      username,
      acno,
      password,
    };
    // asynchronous
    return this.http.post('http://localhost:3000/register', data);
  }
  //deposit
  deposit(acno: any, password: any, amt: any) {
    const data ={
      acno,password,amt
    }
   

    return this.http.post('http://localhost:3000/deposit',data,this.getOptions())
  }
  getOptions(){
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append('x-access-token',token)
      options.headers = headers
    }
    return options
  }





  withdraw(acno: any, password: any, amt: any) {
    var amount = parseInt(amt);
    let db = this.db;

    if (acno in db) {
      if (password == db[acno]['password']) {
        if (db[acno]['balance'] > amount) {
          db[acno]['balance'] -= amount;
          db[acno].transaction.push({
            type: 'DEBIT',
            amount: amount,
          });
          this.saveDetails();
          return db[acno]['balance'];
        } else {
          alert('insufficient balance');
        }
      } else {
        alert('Incorrect Password');
        return false;
      }
    } else {
      alert('user does not exist');
      return false;
    }
  }
  getTransaction(acno: any) {
    return this.db[acno].transaction;
  }
}
