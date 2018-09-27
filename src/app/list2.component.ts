import { Component,ViewChild } from '@angular/core';
import {appService} from './app.service';
import { TreeComponent } from 'angular-tree-component';


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
   <tree-root [nodes]="nodes" [options]="options"></tree-root>
   `,
})
@ViewChild(TreeComponent)
export class AppList2  {
    public heroes: Array<any>; 
    nodes = [
      {
        id: 1,
        name: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        name: 'root2',
        children: [
          { id: 5, name: 'child2.1' },
          {
            id: 6,
            name: 'child2.2',
            children: [
              { id: 7, name: 'subsub' }
            ]
          }
        ]
      }
    ];
    options = {};
    constructor(public service: appService) {
        this.heroes = this.service.getList();
}
  birthday = new Date(1988, 3, 15); // April 15, 1988  
      
    }
