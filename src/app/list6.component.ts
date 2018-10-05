import { Component, OnInit } from '@angular/core';
import {appService} from './app.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component ({
   selector: 'my-app8',
   templateUrl: './list6.component.html',
})

export class AppList6 implements OnInit{
    public list;
    public flag;
    public arrList:Array<any> = [];
    constructor(private router: Router,
        public service: appService) { 
            this.service.getModel().subscribe((res: any) => {
               this.arrList = res;
               this.list=this.arrList.length;
            });          
        }
        ngOnInit(){
           this.flag = this.arrList.length ? true : false;
        }
       
    fun(ev?){
        (ev)?this.router.navigate(["list5/"+ev.target.id]) : this.router.navigate(["list5"]);
    }
    buttonclick(ev){
        console.log(ev);
    }
}