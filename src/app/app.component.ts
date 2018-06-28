import { Component } from '@angular/core';
import {appService} from './app.service'; 
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms'
@Component({
  selector: 'app-root',
   templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  title = 'app';
 
    value: string = ""; 
    constructor(private _appService: appService) { }  
 
    ngOnInit(): void { 
       this.value = this._appService.getApp(); 
       
    } 
 
}

 

