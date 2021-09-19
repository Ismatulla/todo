let express = require('express')
const mongoose  = require('mongoose')
let TodoTask = require('./models/TodoTask')
let app = express()
const dotenv = require('dotenv')
dotenv.config()

//connecting to css //
app.use('/static',express.static('public'))
app.use(express.urlencoded({extended:true}))

// ====MONGOOSE CONNECTION===== //
mongoose.connect('mongodb://localhost/todo');

// ==== EJS ====//
app.set('view engine','ejs')

// ===== Express Route Here ====//
app.get('/',(req,res)=>{
    TodoTask.find({},(err,tasks)=>{
    res.render('index.ejs',{todoTasks:tasks})
    })
    })

app.post('/',async(req,res)=>{
    const todoTask = new TodoTask ({
        content:req.body.content
    });
try{
    await todoTask.save()
    res.redirect('/')
}catch(e){
    res.redirect('/')
}
})
app.get('*',(req,res)=>{
    res.send('invalid page')
})

// UPDATE METHOD

app
.route('/edit/:id')
.get((req,res)=>{
    const id = req.params.id;
    TodoTask.find({},(err,tasks)=>{
        res.render('todoEdit.ejs',{todoTasks:tasks,idTask:id})
    })
})
.post((req,res)=>{
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id,{content:req.body.content},err=>{
        if(err) return res.send(500,err)
        res.redirect('/')
    })
})

// DELETE METHOD

app.route('/remove/:id').get((req,res)=>{
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id,err=>{
        if(err) return res.send(500,err)
        res.redirect('/')
    })
})

// SERVER LISTENING ON PORT 3000 //
app.listen(3000,function(){
    console.log('listening on port 3000!!')
})