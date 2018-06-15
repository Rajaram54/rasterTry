import { Component } from '@angular/core';
import {appService} from './app.service';

@Component ({
   selector: 'my-app',
   template: `
   <h1>{{title}}</h1>
  <div  style="width: 25%; margin-left: auto; margin-right: auto;">
   <p>Product of List 2:</p>
   <ul>
     <li *ngFor="let hero of heroes">
       {{ hero }}
     </li>
   </ul>
   </div>
   `,
})
export class AppList2  {
    public heroes: Array<any>; 
    constructor(public service: appService) {
        this.heroes = this.service.getList();
        
      
    }
}