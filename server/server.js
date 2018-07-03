const express=require('express');
const app=express();
const path = require('path')
//use created angular project here
app.use(express.static(path.join(__dirname,'/../dist/basicRouting')));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname, '/../dist/basicRouting/index.html')))

app.listen(3000,()=>console.log("Listening on Port 3000"));