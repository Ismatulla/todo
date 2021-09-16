let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const mongoose  = require('mongoose')
/* let todos = [
    'Go to school',
    'do your homework',
    'have a lunch'
]
 */
// ====MONGOOSE===== //
mongoose.connect('mongodb:localhost/todo');
// ==== EJS ====//
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}))

// MONGOOSE SCHEMA
let todoSchema = new mongoose.Schema({
    name:String
})

// ===== Express Route Here ====//
app.get('/',(req,res)=>{
    Todo.find({},function(err,todos){
        if(err) console.log(err)
        else{
            res.render('index.ejs',{todos:todos})
        }
    })
   
})

let Todo = mongoose.model("Todo",todoSchema)

app.post('/newtodo',(req,res)=>{

let newItem =new Todo ({name:req.body.item});
Todo.create(newItem,function(err,Todo){
  if(err) console.log('error occured!')
  else{
      console.log('inserted item'+newItem)
  }
})
res.redirect('/')
})

app.get('*',(req,res)=>{
    res.send('invalid page')
})

// SERVER LISTENING ON PORT 3000 //
app.listen(3000,function(){
    console.log('I am listening you boy!!')
})