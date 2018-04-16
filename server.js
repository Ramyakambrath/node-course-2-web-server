const express=require('express');
const hbs=require('hbs');
const fs= require('fs');

const port =process.env.PORT || 3000 ;
hbs.registerPartials(__dirname +'/views/partials')
var app=express();
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}:${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n',(err)=>
{   if(err){
    console.log('Unabale to append the log') }
}
);
next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
   //return 'test';
})
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        userName:'Ramya'
  //      currentYear: new Date().getFullYear()
    })
// res.send('Hello Express');
// res.send({
//     name: 'Ramya',
//     likes:['running','biking']
// });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
       // currentYear: new Date().getFullYear()
    })
})
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Bad Request'
    });
})

app.listen(port,()=>{
    console.log(`server is up and running on ${port}`)
});