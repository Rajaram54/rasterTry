import { Component } from '@angular/core';
import {appService} from './app.service'; 
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'
@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
//   template: ` 
//   <ul>
//   <li><a [routerLink] = "['/list']">List 1</a></li>
  
//   <li><a [routerLink] = "['/list2']">List 2</a></li>
// </ul>
// <div  style="text-align:center" >
// <router-outlet></router-outlet>

// </div>

// `

})
export class AppComponent {
  title = 'app';
 
    value: string = ""; 
    constructor(private _appService: appService) { }  
 
    ngOnInit(): void { 
       this.value = this._appService.getApp(); 
       
    } 
 
}

 

