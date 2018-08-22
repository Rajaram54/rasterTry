import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component ({
   selector: 'my-app',
   template: `
  <h1> The Route id is={{id}}</h1>
   `,
})
export class RouteParams  {
public id;
constructor(route: ActivatedRoute){
  this.id= route.snapshot.params.id;
}   
}