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

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO contactdb (name, email, contact) VALUES ('JEEVANSHII', 'JEEVANSHI.JB@GMAIL.COM', '8968517826')";
    // db.query(sqlInsert, (error, result)=>{
    //     console.log("error", error);
    //     console.log("result", result);
        res.send("Heloo express");
    // });
});

app.listen(8000, ()=>{
    console.log("Server is running on port 8000");
})