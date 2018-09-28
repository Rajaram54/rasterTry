import { Component } from '@angular/core';
import {appService} from './app.service';

@Component ({
   selector: 'my-app',
})
export class List6 {
public arrList: Array<any>; 

    constructor(public service: appService) {
        this.arrList = this.service.getList();
    }
    // const express=require('express');
    // const app=express();
    // const path = require('path')
    // //use created angular project here
    // var bodyParser = require('body-parser')
    // app.use(express.static(path.join(__dirname,'/../basicRouting/dist/basicRouting')));
    // app.use(bodyParser.json());
    // app.use(bodyParser.text({ type: 'text/html' }));
    // app.get('/',(req,res)=>res.sendFile(path.join(__dirname, '/../dist/basicRouting/index.html')));
    
    // var pg = require("pg");
    
    // var config = {
    //   user: 'postgres',
    //   database: 'my_database', 
    //   password: '1q2w3e4r5t', 
    //   host: 'localhost',
    //   port: 5433, 
    //   max: 10, // max number of connection can be open to database
    //   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    // };
    // var pool = new pg.Pool(config);
     
    // app.post('/form', function (req, res, next) {
    //  // window.alert("came in");
    //  console.log(req.body,"req@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
     
    //   pool.connect(function(err,client,done)  {
    //        if(err){
    //            console.log("not able to get connection "+ err);
    //            res.status(400).send(err);
    //        } 
    //     //   let id = res.body.id;
    //        //console.log(req.body.id,"hdskjaghdskjhg;adgkhaoie'ghsvdhnflksfhsoiafgdsifhdsi'AJS");
    //        client.query(`INSERT INTO "Students" VALUES ($1,$2,$3,$4,$5,now(),$6)`,[req.body.id,req.body.name,req.body.email,req.body.password,req.body.Desination,req.body.date1],function(err,result) {
    //            done(); // closing the connection;
    //            if(err){
    //                console.log(err)
    //                res.status(400).send(err);
    //            } else
    //                res.status(200).send(result.rows);
    //        })
    //     });
    // });
    // app.get('/getdata', function(request, response) {
    //     pool.connect(function(err,client,done)  {
    //         if(err){
    //             console.log("not able to get connection "+ err);
    //             res.status(400).send(err);
    //         } 
    //     client.query('SELECT * FROM "Students" ', function(err, results) {
    //         done();
    //       if (err) {
    //         throw err;
    //       }
    //       console.log("hello",results.rows);
    //       response.send(results.rows); // assumes 'results.rows' can be serialized to JSON
    //     });
    //     });
    //   });
    //   app.post('/tabl',function(req,res){
    //       pool.connect(function(err,client,done){
    //           if(err){
    //               console.log("table error",err);
    //               res.status(400).send(err,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    //           }
    //           console.log(req)
    //           for(var i = 0; i < req.body.length;i++){
    //           const {
    //               form,
    //               value:{                 
    //                   name,
    //                   age
    //                 } 
    //                 } = req.body[i];
    //                 //var args = req.body[0];
    //           client.query(`insert into details values ($1,$2,$3)`,[form,name,age],function(err,result){
    //                 console.log(result)
    //           })}
    //       })
    //   })
    // app.listen(3000,()=>console.log("Listening on Port 3000"));
}