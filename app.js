const express = require('express')
const bodyParser = require('body-parser')
const { getDate } = require('./date')
const date = require(__dirname + "/date.js")

const app = express()
const port = process.env.PORT || 5000

let Items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/' , (req , res)=>{
    
   let day = getDate();
    res.render('list' ,{listTitle: day, newListItems: Items});
    
});

app.post('/' , (req , res)=>{
    
    let Item = req.body.newItem;
    
    if(req.body.list === "Work list")
    {
        workItems.push(Item)
        res.redirect("/work")
    }
    else{
        Items.push(Item);
        res.redirect("/");
    }
});

app.get('/work' , (req , res)=>{

   res.render("list", {listTitle: "Work List", newListItems: workItems})

})

app.get('/about' , (req , res)=>{

   res.render('about')

})

app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))