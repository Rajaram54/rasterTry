import { Component } from '@angular/core';
import {appService} from './app.service';

@Component ({
   selector: 'my-app',
   template: `
   <h1>{{title}}</h1>

    <div>
    <p>Product of List 1:</p>
    <ul>
     <li (click) = "onclick($event)" *ngFor="let hero of heroes">
       {{ hero }}
     </li>
   </ul>
   <p>{{value}} </p>
   </div>
   `,
})
export class Applist {
public heroes: Array<any>; 
public value: string = 'nothing clicked';
    constructor(public service: appService) {
        this.heroes = this.service.getList();
    }
    onclick(event){
        this.value = 'clicked something'
    }
}