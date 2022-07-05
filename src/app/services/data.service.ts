import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}


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
    const data ={
      acno,password,amt
    }
   
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

  }
  getTransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())
  }

  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
  }
}
