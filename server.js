const express = require('express');
const app = express();
const morgan=require("morgan");
const PORT=3000;


app.use(morgan());  //morgan is a middleware function that logs the request method and url to the console
// const logMiddleware = (req,res,next)=>{   //middleware function
    
//     console.log(`${req.method}${req.url}`);
//     next();
// }

const logMiddleware = (req,res,next)=>{   //middleware function
    req.name = "william";
    console.log("Request url:",req.url,"req method:",req.method,"Time:",new Date().toLocaleDateString());
    next();
}
const apiCheckMiddleware = (req,res,next)=>{
    if (req.query.API_KEY ==="112345"){
        next();
    }
    else{
        res.status(401).send("Unauthorized");
    }
}


// app.use(logMiddleware);
app.use(apiCheckMiddleware);

app.get("/",(req,res)=>{
    console.log(`Request name: ${req.name}`);
    console.log("hello world");
    res.send("Hello World");
})
app.get('/',(req,res)=>{
    console.log("hello world");
    res.send("Hello World");
})
app.get("/data",(req,res)=>{
    res.json({name:"william",age:20});
})



app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
})