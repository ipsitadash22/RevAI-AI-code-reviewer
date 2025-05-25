const express = require("express");
const aiRoutes=require("./routes/ai.routes")
const cors=require('cors')

const app=express();//express application create hota hai

app.use(cors())

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello world");
})
app.use('/ai',aiRoutes);

module.exports=app;//app ko export kiya jata hai taaki dusre file me use kiya ja sake