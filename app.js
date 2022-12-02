
const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

const Blog = require('./model/blog.js');
const blog = require('./model/blog.js');

const port = process.env.PORT || 3000;

const app = express();


//server setup

app.set('view engine' , 'ejs');


const dbURI = 'mongodb://raspberry:eLEtnOd2L9rLFzWs@cluster0-shard00-00.4vcln.mongodb.net:27017,cluster0-shard-00-01.4vcln.mongodb.net:27017,cluster0-shard-00-02.4vcln.mongodb.net:27017/?ssl=true&replicaSet=atlas-5fmlmn-shard-0&authSource=admin&retryWrites=true&w=majority';


mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
       .then(result => {

        console.log('database connected')


        app.listen(port);
        console.log('server running at ' , port);


       })

      
       .catch( err => {
         console.log(err);
       })



//morgan

app.use(morgan('dev'));

//static 
app.use(express.static('public'))

//url parse
app.use(express.urlencoded({extended : true}));



//home page // all blogs..............

app.get('/editor' , (req,res) =>
{



  
    Blog.find().sort({createdAt : -1})
     .then(result => {
       
      res.render('index' , {title : 'Home' , blogs: result});

     })
     .catch(err => console.log(err))



    
});




//single blog ..........................

app.get('/blog/:id' , (req,res) => {

  const id = req.params.id;

  Blog.findById(id)
     .then(result => {
       console.log(result)


         res.render('Blog' , {title : 'blog' , blog : result});

     })
     .catch(err => console.log(err))





});


// delete single blog ..........................

app.delete('/blog/:id' , (req,res) => {

  const id = req.params.id;

  const myresponse ={
    status : 'sucess'
  }

  Blog.findByIdAndDelete(id)
     .then(result => {
       

       res.json(myresponse)

     })
     .catch(err => console.log(err))





});


// editor page ..........................
app.get('/' , (req,res) => {


  Blog.find().sort({createdAt : -1})
  .then(result => {
    
   res.render('editor' , {title : 'Editor' , blogs: result});

  })
  .catch(err => console.log(err))



});



// create blog ..........................
app.get('/create' , (req, res) =>
{
    res.render('create' , {title: 'Create'});
});

app.post('/create' , (req, res) =>{


  const blog = new Blog(req.body);

blog.save()
    .then( result =>{
      res.redirect('/');
    })
    .catch( err => console.log(err));

});






// edit blog ..........................

app.get('/blog/:id' , (req,res) => {

  const id = req.params.id;

  Blog.findById(id)
     .then(result => {
       console.log(result)


         res.render('edit' , {title : 'edit' , blog : result});

     })
     .catch(err => console.log(err))

});


app.post('/edit' , (req, res) =>{


  const blog = new Blog(req.body);

  User.findByIdAndUpdate(id)
 

});



//middle ware 
app.use((req,res)  => {

   res.send('404 not found , oops ')

})





