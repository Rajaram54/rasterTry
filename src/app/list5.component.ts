import { Component } from '@angular/core';
import {appService} from './app.service';


@Component ({
   selector: 'list-comp',
   templateUrl: './list5.component.html',
})

export class AppList5 {
  public imagesArr: Array<any>;

  constructor(private service: appService) {
  }
}