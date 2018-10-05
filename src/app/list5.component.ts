import { Component } from '@angular/core';
import { appService } from './app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'list-comp',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.css']
})

export class AppList5 {
  // public imagesArr: Array<any>;
  public videothumbnail: Array<any>;
  public count;
  public displaylist = [];
  public instance;
  public modelName;
  public sel: boolean = false;
  constructor(private service: appService,
    public route: ActivatedRoute) {
    this.modelName = this.route.snapshot.paramMap.get('ModelName');
    this.sel = this.modelName ? true : false;
    this.videothumbnail = service.getVideo();
    this.instance = 1;
    this.count = [{
      'form': $('#input1').val() || 1,
      'value': { 'name': '', 'age': '' }
    }];
    this.service.getDeatils(this.modelName).subscribe((res: any) => {
      console.log(res);
      this.displaylist.push(res);
      console.log(this.displaylist)
    })

  }
  increment() {
    this.instance++;
    this.count.push({ 'form': this.modelName, 'value': { 'name': '', age: '' } });
  }
  submit() {
    console.log('Model value', this.count);
    this.service.putdeatils(this.count);
    location.reload();
  }
  display() {

  }
}

