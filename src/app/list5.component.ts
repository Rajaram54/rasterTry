import { Component } from '@angular/core';
import {appService} from './app.service';


@Component ({
   selector: 'list-comp',
   templateUrl: './list5.component.html',
})

export class AppList5 {
 // public imagesArr: Array<any>;
  public videothumbnail:Array<any>;
  public count;
  public instance;
  constructor(private service: appService) {
    this.videothumbnail=service.getVideo();
    this.instance=1;
    this.count = [{'form': this.instance, 
                   'value': {'name': '', 'age': ''} }];
    

  }
  increment(){
    this.instance++;
    this.count.push({'form': this.instance, 'value': {'name': ''}  });
  }
  submit(){
    console.log('Model value', this.count);
  }
}