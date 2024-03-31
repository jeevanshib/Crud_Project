const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mysql = require("mysql2");
// Connect to database
const db = mysql.createPool({ 
    host: "localhost", 
    user: "root",
    password: "jeevanshi11",
    database: "crudproject"
    });


const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",  (req, res) => {
    const sqlGet = "SELECT * FROM contactdb";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});


app.post("/api/post", (req, res) => {
   const {name, email, contact} = req.body;
   const sqlInsert = "INSERT INTO contactdb (name, email, contact) Values (?,?,?)"
   db.query(sqlInsert,[name, email,contact], (err, results) =>
   {
       if(err){
        console.log(err);
       }
});
});

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contactdb WHERE id=?"
    db.query(sqlRemove, id , (err, results) =>
    {
        if(err){
         console.log(err);
        }
 });
 });

 app.get("/api/get/:id",  (req, res) => {
    const{ id }=req.params;
    const sqlGet = "SELECT * FROM contactdb WHERE id = ?";
    db.query(sqlGet, id, (error, result)=>{
        if(error){
            console.log(error);
        }
            res.send(result);
        });
    });


    app.put("/api/update/:id",  (req, res) => {
        const{id}=req.params;
        const {name, email, contact} = req.body;
        const sqlUpdate = "UPDATE contactdb SET name = ?, email = ?, contact = ? WHERE id = ?";
        db.query(sqlUpdate,[name, email, contact, id], (error, result)=>{
            if(error){
                console.log(error);
            }
                res.send(result);
            });
        });

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})
