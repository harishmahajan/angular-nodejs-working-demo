import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { apiUrl } from '../global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private register={};
  private flag=false;
  private userid:any;
  
  constructor(private http: HttpClient,  private activatedRoute: ActivatedRoute, private router:Router) {}

  ngOnInit() {    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userid = params.uid;
      if(this.userid!='' && this.userid!=null)
      {
        this.http.post(apiUrl+ "getSingleUser",{'uid':params.uid}).subscribe((datas)=>{
          if(datas!=null)
          {
            this.register['mail']=datas['data'].mail;
            this.register['username']=datas['data'].username;
            this.flag=true;  
          }
        })
      }
    });
  }
  onRegister(){
    this.http.post(apiUrl+ "userRegister",this.register).subscribe((data)=>{
      this.router.navigate(["list"]);
    });
  }
  onUpdateRegister(){
    console.log("this",this.register)
    var data = { "datas":this.register, "uid":this.userid };
    this.http.post(apiUrl+ "updateUser",data).subscribe((data)=>{
      this.router.navigate(["list"]);
    });
  }
}
