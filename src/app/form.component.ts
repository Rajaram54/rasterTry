import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms'



@Component({
    selector: 'my-app',
    templateUrl: './form.component.html',
})
export class Form {
    value = '';
    value2 = "";
    value3 = "";
    value4 = "";


    onEnter3(value4: string, value3: string, value2: string, value1: string) {
    this.value4 = value4;
        this.value3 = value3;
        this.value2 = value2;
        this.value = value1;
    }



}