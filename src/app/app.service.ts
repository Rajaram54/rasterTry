import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({
      'content-type':  'application/json'
    })
  };
 @Injectable()
 
 export class appService { 
    constructor(private http: HttpClient) { 
        
    }
    getApp(): string { 
       return "Hello world!!!"; 
    }
    getList(){
        return ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    }
    getImages(){
        return ['./assets/abc.jpg','./assets/pic1.jpg','./assets/pic2.jpg','./assets/pic3.jpg','./assets/pic4.jpg','./assets/pic5.jpg','./assets/pic6.jpg','./assets/pic7.jpg','./assets/pic8.jpg','./assets/pic9.jpg','./assets/pic10.jpg','./assets/pic11.jpg' ];
      
    } 
    putinto(obj:object){
        this.http.post("/form", JSON.stringify(obj), httpOptions).subscribe((res)=>console.log("insert"));
    }
    getTable(){
        return this.http.get('/getdata');
    }
    getVideo(){
        this.http.get("/vid")
         return ['./assets/movie.mp4'];
    }
 } 
