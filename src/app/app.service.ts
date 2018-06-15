import { Injectable } from '@angular/core';  
 
 @Injectable()
 export class appService {  
    getApp(): string { 
       return "Hello world!!!"; 
    }
    getList(){
        return ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    } 
 } 