import { Component } from '@angular/core';
import {appService} from './app.service';


@Component ({
   selector: 'list-comp',
   templateUrl: './list5.component.html',
   styleUrls: ['./list5.component.css']
})

export class AppList5 {
 // public imagesArr: Array<any>;
  public videothumbnail:Array<any>;
  public count;
  public instance;
  public sel:boolean=false;
  constructor(private service: appService) {

    this.videothumbnail=service.getVideo();
    this.instance=1;
    this.count = [{'form': this.instance, 
                   'value': {'name': '', 'age': ''} }];
    

  }
  increment(){
    this.instance++;
    this.count.push({'form': this.instance, 'value': {'name': '',age:''}  });
  }
  submit(){
    console.log('Model value', this.count);
    this.service.putdeatils(this.count);
    location.reload();
  }
}
