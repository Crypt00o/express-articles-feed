const express= require('express');
const router = express.Router();
let dateForNow=require('../date')
//defineing database
const database=require('../database/database');

router.get("/",async(req,res,next)=>{
res.render("index",{articles:await database.getAllArticles()});
})

router.post("/",async(req,res,next)=>{
let newData={title:req.body.title,articleBody:req.body.articleBody,date:dateForNow()}
let created= await database.createingArticle(newData);
let data=await database.getAllArticles();
if(created){
    res.render("index",{articles: data});
}
else{
    res.render("index",{articles: data});
}
})

router.post("/delete",async(req,res,next)=>{
    let willBeDeleted={_id:req.body._id}
    let deleted= await database.deleteArticle(willBeDeleted);
    
    if(deleted){
        res.status(301).redirect("/");
    }
    else{
        let data = await database.getAllArticles();
        res.render("index",{articles: data});
    }

})


router.post('/edit',async(req,res,next)=>{
   
   res.render('edit',{title:req.body.title,_id:req.body._id,articleBody:req.body.articleBody});
})

router.post("/edited",async(req,res,next)=>{
    let newData={title:req.body.title,articleBody:req.body.articleBody,date:dateForNow()}
    let result=await database.editArticle({_id:req.body._id},newData);
    
    if(result){
    res.status(301).redirect("/")
    
    }
    else{
        let data = await database.getAllArticles();
        res.render("index",{articles: data});
    }

})
router.all("/*",(req,res,next)=>{
    res.status(404).send("<h1>404 Not found :)</h1>")
})

module.exports=router

