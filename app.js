const express = require('express');
const app =express();
const logger=require('morgan')
const bodyPareser=require('body-parser');

app.set('views',"./views");
app.set('view engine','ejs');

app.use(bodyPareser.urlencoded({extended:false}));
app.use(logger('combined'));

const indexRouter=require('./routes/index');

app.use("/",indexRouter);
app.listen(8080)

