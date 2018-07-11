import { Component } from '@angular/core';
import {appService} from './app.service';


@Component ({
   selector: 'my-app2',
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
   <p>The hero's birthday is {{ birthday | date }}</p>
   `,
})
export class AppList2  {
    public heroes: Array<any>; 
  
    constructor(public service: appService) {
        this.heroes = this.service.getList();
}
  birthday = new Date(1988, 3, 15); // April 15, 1988  
      
    }
