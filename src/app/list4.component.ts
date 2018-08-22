import { Component } from '@angular/core';
import {appService} from './app.service';
import { AppList5 } from './list5.component';
import { DragulaService } from 'ng2-dragula';

@Component ({
   selector: 'my-app2',
   templateUrl: './list4.component.html',
})
export class AppList4  {
    public imagesArr: Array<any>; 
  
    constructor(public service: appService,
    public drag: DragulaService) {
        this.imagesArr = this.service.getImages();
}
}
