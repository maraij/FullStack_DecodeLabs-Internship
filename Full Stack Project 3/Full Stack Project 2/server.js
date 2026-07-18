const express=require('express');
const cors=require('cors');
const fs=require('fs');
const app=express();
app.use(cors());app.use(express.json());app.use(express.static('.'));
const products=[{id:1,name:'Sourdough'},{id:2,name:'Croissant'}];
app.get('/api/products',(req,res)=>res.json(products));
app.post('/api/orders',(req,res)=>{
const {name,email,product}=req.body;
if(!name||!email||!product)return res.status(400).json({success:false,message:'Fill all fields'});
let arr=[];try{arr=JSON.parse(fs.readFileSync('data/orders.json'))}catch(e){}
arr.push(req.body);fs.writeFileSync('data/orders.json',JSON.stringify(arr,null,2));
res.json({success:true,message:'Order placed'});
});
app.listen(3000,()=>console.log('Running http://localhost:3000'));
