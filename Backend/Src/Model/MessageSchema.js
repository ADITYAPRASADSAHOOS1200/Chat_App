import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema({
   text:{
      type:String,
      default:"",
   },
   imageUrl:{
      type:String,
      default:"",

   },
   VideoUrl:{
      type:String,
      default:"",

   },
   Seen:{
    type:Boolean,
    default:false
   }
  
},{timestamps:true})




const Message = mongoose.model("Message",MessageSchema)

export default Message