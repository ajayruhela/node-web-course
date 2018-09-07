const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// To use a different extension (i.e. html) for your template files:

// app.set('view engine', 'html'); 
// app.engine('html', require('hbs').__express);

app.use((req,res,next)=>{
    //some code and then call next();
    // if we do not call the next then the app will not move on to the next steps
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('Server.log',log + '\n',(err)=>{
      if(err){
          console.log('Unable to append to server log');
      }
  });
    next();
});
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

// add public folder after the maintenance other wise it will not stop the access for the public folder pages
app.use(express.static(__dirname + '/public'));  // this is used to deliver static sorces before comaring 
                                                // the other routes.
                                                // now you can access http://localhost:3000/help.html
                                                // app.use is ued for registering the middleware and we can pass the third
                                                //param as "next" which will call the subsequent middleware e.g  authentication-->
                                                //authorization.
                                                //
 // current year claculation can be added using hbs helper

 hbs.registerHelper('getCurrentYear',()=>{
     return new Date().getFullYear();
 }); 
 
 // some funny things
 hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle: 'Home Page',
       //currentYear: new Date().getFullYear(),  added to helper
        siteOwner: 'Ajay',
        createdIn : '2018'
    });

      //response.send('<h1>Hello Express!</h1>');
    //   response.send({
    //       name: 'Ajay',
    //       likes: [
    //           'Bikes',
    //           'Cars'
    //       ]
    //   });
});
app.get('/about',(request,response)=>{
   // response.send('<h2>about Page</h2>');
   response.render('about.hbs',{
       pageTitle: 'About Page',
       //currentYear: new Date().getFullYear()

   });
});

app.get('/bad',(request,response)=>{
    response.send({error: 'Bad Request'});
    
});
app.listen(3000, ()=> {
    console.log('Server is running on Port 3000' );
});