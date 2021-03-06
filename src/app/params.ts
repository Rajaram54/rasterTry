import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { appService } from './app.service';

@Component({
  selector: 'my-app5',
  template: `
  <table>
   <tr *ngFor="let testobject of  obj">
  <td>  <a [routerLink] = "['/params',testobject.id]">{{testobject.id}}</a></td>
  <td>{{testobject.name}}</td>
  <td>{{testobject.password}}</td>
  <td>{{testobject.email}}</td>
  <td>{{testobject.designation}}</td>
  <td>{{testobject.createdAt}}</td>
  <td>{{testobject.updatedAt}}</td>
  </tr>
  </table>
   `,
   styleUrls: ['./params.css']
})
export class Param {
  public obj: Array<any> = new Array();
  public len;
  constructor(private _appService: appService) {
    _appService.getTable().subscribe((result) => {
      console.log(result);
      if (result) {
        this.len = Object.keys(result).length;
        for (let x = 0; x < this.len; x++) {
          let id = result[x].id;
          console.log(id);
          let name = result[x].name;
          let email = result[x].email;
          let password = result[x].password;
          let designation = result[x].designation;
          let createdAt = result[x].createdAt;
          let updatedAt = result[x].updatedAt;
          this.obj.push({ id, name, email, password, designation, createdAt, updatedAt });
          console.log("this.obj", this.obj);
        }
      }
    });
  }
}