const { json } = require("express");
const express= require("express");
const cors=require("cors");
const  mongoose = require("mongoose");
const userSchema=require("./model/user_model")
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Flukus:1234@clustercoex.6e4o8ia.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true})
.then(()=>{
    console.log("conectado");
}).catch(err =>console.log(err));



const app =express();

const PORT=3000;

app.use(cors())
app.use(json());
 
app.post('/user',(req,res)=>{
    const user=new userSchema(req.body);
    user.save()
    .then((data)=>{res.json({
        message:"user created",
        data:data
    })}).catch((err)=>{res.json({message:err.message})})
})

app.get("/users",async(req,res)=>{
    const users= await userSchema.find()
    res.json({users:users})

})

app.post('/edit/user/:id',async(req,res)=>{
    const{id}=req.params
    const user=await userSchema.findByIdAndUpdate(id,req.body)
    res.json({message:"usuario cambiado",user:user})
    
})

app.delete("/user/:id",async(req,res)=>{
    const{id}=req.params
    await userSchema.findByIdAndDelete(id)
    res.json({message:"usuario eliminado"})
})






app.listen(PORT,()=>{
    console.log("servidor funcionando en puerto ", PORT);
})