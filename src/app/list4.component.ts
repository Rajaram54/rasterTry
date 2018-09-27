import { Component, ElementRef,ApplicationRef } from '@angular/core';
import {appService} from './app.service';
import { AppList5 } from './list5.component';
import { DragulaService } from 'ng2-dragula';


@Component ({
   selector: 'my-app2',
   templateUrl: './list4.component.html',
   viewProviders : [DragulaService]
})
export class AppList4  {
    public imagesArr: Array<any>;
    public  flag:boolean=false;
    public path:any;
    public options= {
        removeOnSpill: true
    }

    constructor(public service: appService,
        public elementRef: ElementRef,
        public appRef: ApplicationRef,
        private dragulaService: DragulaService) {
        this.imagesArr = this.service.getImages();
        // this.dragulaService.setOptions('reception-bar-bag', {
        //     direction: 'horizontal',
        //     moves: function (el, container, handle) {
        //         return true;
        //     },
        //     accepts: function (el, target, source, sibling) {
        //         return true;
        //     }
        // });
    }

   
    click(ev){
        this.flag=true;
      this.path=  ev.target.src;
    }


}
