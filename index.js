import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

    mongoose.connect("mongodb://localhost:27017/employeeDB",{
                useNewUrlParser : true, 
                useUnifiedTopology : true
            }, () => {
            console.log("DB connected")
        } )
    const empSchema = new mongoose.Schema({
        name: String,
        empid: Number,
        address : String,
        mobno: Number,
        department: String,
        salary: Number
    })

const Employee = new mongoose.model("Employee",empSchema)

//routes
    app.post("/register", (req,res) => {
        const{name,empid,address,mobno,department,salary} = req.body
        Employee.findOne({empid:empid}, (err,user) =>{
        console.log("indise db");
        
        if(user){
            console.log("user found")
            res.send({message:"User registered already"})
        }else{
            const emp = new Employee({
                name,
                empid,
                address,
                mobno,
                department,
                salary
            })
            emp.save(err =>{
                console.log("registering user")
                if(err){
                    console.log(err)
                    res.send(err)
                }else{
                    console.log("returning response")
                    res.send({message: "Registered Succesfully"})
                }
            })
        }
    })
    })
    app.patch("/update",async(req,res) =>{
        console.log("update called")
        const post = await Employee.findOne({ empid : req.body.empid})
        const{ address , mobno} = req.body
        if(req.body.mobno && req.body.address){
            post.address = req.body.address
            post.mobno = req.body.mobno
        }
        await post.save();
        res.send(post);
    })
    {console.log("backend working")}

app.listen(9000,() => {
    console.log("server started");
})