const express =require('express')
const hbs = require('hbs');
const fs = require('fs')

var app = express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');

//loggin server requests
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log= `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log +'\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    });
    next();
});
// maintanence page middleware
app.use((req,res,next)=>{
    res.render('maintenance.hbs')
});
// order of the app use it is important! 
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear', ()=>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIT', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req,res)=>{
    // res.send('<h1> Hello Express! </h1>')
    res.render('home.hbs', {
        pageTitle: 'Home',
        message: "Welcome to my New website",

    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
   
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        errorMessage: "Something went wrong!"
    })
});

app.listen(3000, ()=> {
    console.log('Serve started in port 3000')
});

