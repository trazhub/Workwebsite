const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items =[];
let workItems =[];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){


    let day = date.getDate();
    res.render("list",{ListTitle: day, newListItems: items});
});

app.post("/",function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "WorkList"){
        workItems.push(item)
        res.redirect("/work")
    }else {
        items.push(item)
        res.redirect("/")
    }
    

    
})

app.get("/work",function(req,res){
    res.render("list", {ListTitle: "WorkList", newListItems: workItems})
})



app.listen(3000,function(){
    console.log("[🎒] Server Running At http://localhost:3000");
})