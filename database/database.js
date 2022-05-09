const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/mydatabase"
mongoose.connect(url, (err)=>{
if(err)
	console.log("[-]Error: "+err);
else
	console.log("[+]Connected to database");

})

//defineng Schema for Articles : 
const articlesSchema =mongoose.Schema({
title: {
	type:String,
	required:true
},
articleBody:{
type:String,
required:true,
},
date:
{
    type:String,required:false
}

});

//defineing a Model with collections called articles
const articlesModel=mongoose.model('article',articlesSchema);

//creating CRUD fucntions
const createingArticle  = async(data)=>{
let result;
	await articlesModel.create(data,(err)=>{
		if(err){
			console.log("[-]Error while creating: ".concat(err) );
			result= false;
		}
		else{
			console.log("[+] Created Article :".concat( JSON.stringify(data) ) );
			result= true;
		}
	})
	return result;
}

const findId = async(data)=>{
let result = await articlesModel.findOne(data).select('_id');
if(result==null){
	console.log('[-] ID Not Found ');
	return false;
}
else {
	console.log('[+] ID Founded');
	return result;
}

}



const getArticle=async(data)=>{
let result = await articlesModel.findOne(data);
if(result==null){ 
        console.log('[-] Not Found ');
        return false;
}
else { 
        console.log('[+] Founded: '.concat( JSON.stringify(result) ));
        return result;
}

}


const getAllArticles=async()=>{
let result = await articlesModel.find({});
if(result.length==0){ 
        console.log('[-] Empety ');
        return result;
}
else { 
        console.log('[+] All Articles: '.concat(JSON.stringify(result)));
        return result;
}

}

const editArticle=async(data,newData)=>{
let result=await findId(data);
if(result){
	articlesModel.findByIdAndUpdate(result,newData,{new:true},(err)=>{
	 if(err){
	  console.log("[-] Error while Updateing  :"+err);
	}
	 else{
	  console.log("[+] Updated : ".concat(JSON.stringify(newData)))
	}
	
    })
	return true;
}

else{
	console.log("[-] Not Found To Update !");
	return false;

   } 

}



const deleteArticle=async(data)=>{
let result=await findId(data);
if(result){
        articlesModel.findByIdAndDelete(result,(err)=>{
         if(err){
          console.log("[-] Error while Deleteing  :"+err);
        }
         else{
          console.log("[+] Deleted : ".concat(JSON.stringify(data)))
        }
		;
})
return true
}
else{
	console.log('[-] Not Found To Delete ! ')
	return false;
}

}

module.exports.createingArticle=createingArticle;
module.exports.getAllArticles=getAllArticles;
module.exports.getArticle=getArticle;
module.exports.findId=findId;
module.exports.editArticle=editArticle;
module.exports.deleteArticle=deleteArticle;


