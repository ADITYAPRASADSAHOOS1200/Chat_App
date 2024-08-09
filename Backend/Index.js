import app from './App.js'
import connectDB from './Src/connection/connection.js'
const PORT=  process.env.PORT || 5374;



connectDB().then(() =>{
    console.log("MongoDB Connected")
app.listen(process.env.PORT, () => {
       console.log(`Server is running on port http://localhost:${process.env.PORT}`);
   })
app.on('error', (err) => {
   console.log(err)
})


}).catch((err) => {
 console.log(err)
 process.exit(1);
})






