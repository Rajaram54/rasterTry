import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms'
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {appService} from './app.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
    selector: 'my-app4',
    templateUrl: './form.component.html',
})
export class Form {
    value = '';
    value2 = "";
    value3 = "";
    value4 = "";
    value5="";
    value6=" ";
    value7="";

    private name:String;
    private id:number;
    private email:String;
    private password: String;
    private Desination:String;
    private date:Date;
    private date1:Date;

    constructor(public service: appService) {
 
    }
    fun(){
        console.log('variables in this component',this);
        
      
        this.service.putinto({
            name:this.name,
            id: this.id,
            email:this.email,
            password:this.password,
            Desination:this.Desination,
            date:this.date,
            date1:this.date1        
        });
    }


}