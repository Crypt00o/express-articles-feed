const express = require('express');
const app =express();
const logger=require('morgan')
const bodyPareser=require('body-parser');

const host= '0.0.0.0';
const port=80;
app.set('views',"./views");
app.set('view engine','ejs');

app.use(bodyPareser.urlencoded({extended:false}));
app.use(logger('combined'));

const indexRouter=require('./routes/index');

app.use("/",indexRouter);
app.listen(port,host,()=>{
    console.log("Listening on %s:%s",host,port)
})
