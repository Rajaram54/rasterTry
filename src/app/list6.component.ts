import { Component } from '@angular/core';
import {appService} from './app.service';
import { Router } from "@angular/router";

@Component ({
   selector: 'my-app8',
   templateUrl: './list6.component.html',
})
export class AppList6 {
    public list;
    public flag;
    public arrList:Array<any> = [];
    constructor(private router: Router,
        public service: appService) { 

            this.service.getModel().subscribe((res: any) => {
               this.arrList = res;
               console.log('Array List', this.arrList);
            });
            this.flag = this.arrList.length ? true : false;
        }
    fun(){
        this.router.navigate(["list5"])
    }
}