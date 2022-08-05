const { urlencoded } = require('express');
const express=require('express');
const mongoose =require('mongoose'); 
const Blog=require('./model/blogs');

//express app
const app=express();

// connect to mongoDB
const dbUri='mongodb+srv://sample1:test123@nodecluster.drbwr.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbUri,{useNewUrlParser: true,useUnifiedTopology:true})
.then((result)=> app.listen(3000))
.catch((reason)=> console.log(reason));

//register view engine
app.set('view engine','ejs');

//listen for request
app.use(express.static('public'));
//parsing the request data to json
app.use(express.urlencoded({extended:true}));

app.use((req,res,next)=>{
    console.log('new req has been made')
    console.log('host: ',req.hostname)
    console.log('path: ',req.path)
    console.log('method: ',req.method)
    next();
});

app.get('/add-blogs',(req,res)=>{
    const blog=new Blog({
        title: 'blog 3',
        snippet: 'Adding another blog',
        body: 'Some of the things which are used in the world are absolutely useless just like ruby on rails sfsefpjsef'
    });
    blog.save()
    .then((response)=>{
        res.send(response)
    })
    .catch((err)=>console.log(err))
});

app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>console.log(err))
});

app.get('/find-by-id',(req,res)=>{
    Blog.findById("62dec158f7f0f5616e8c9169")
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>console.log(err))
});

app.get('/',function(req,res){
    
    res.redirect('/blogs')
});

app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((response)=>{
        res.render('index',{
            title: 'Home',
            blogs: response
        })
    })
    .catch((err)=>console.log(err))
});

app.get('/about',(req,res)=> {
    res.render('about',{title: 'About Page'});
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create Blogs'});
})

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
    .then((response)=>{
        res.render('blog_details',{title: "Blog details",blog: response})
    })
    .catch((err)=>res.status(404).render('404',{title: '404'}))
})

app.post('/blogs',(req,res)=>{
    console.log(req.body);
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>res.redirect('/blogs'))
    .catch((err)=>console.log(err))
})

app.delete('/blogs/:id',(req,res)=>{
    const id =req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect: '/blogs'});
    })
    .catch((err)=>{console.log(err)})
})

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})
