import { Injectable } from '@angular/core';  
 
 @Injectable()
 export class appService {  
    getApp(): string { 
       return "Hello world!!!"; 
    }
    getList(){
        return ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    }
    getImages(){
        return ['./assets/abc.jpg','./assets/pic1.jpg','./assets/pic2.jpg','./assets/pic3.jpg','./assets/pic4.jpg','./assets/pic5.jpg','./assets/pic6.jpg','./assets/pic7.jpg','./assets/pic8.jpg','./assets/pic9.jpg','./assets/pic10.jpg','./assets/pic11.jpg' ];
    } 
 } 