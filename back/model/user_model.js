const mongoose= require("mongoose");


const userSchema=mongoose.Schema({
   nombre:{
    type:String,
    required:true,
    
   },
   apellido:{
    type:String,
    required:true
   },
   cc:{
    type:Number,
    required:true,
    unique:true
   },
   direccion:{
    type:String,
    required:true
   },
   ciudad:{
    type:String,
    required:true
   },
   telefono:{
    type:Number,
    required:true,
    unique:true
   },
   cupo_total:{
    default:30000,
    type:String
   },
   cupo_disponible:{
    default:30000,
    type:String
   }
});

module.exports= mongoose.model("usuario",userSchema);