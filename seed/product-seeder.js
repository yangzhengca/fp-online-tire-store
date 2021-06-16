var Product=require('../models/product');
var mongoose=require('mongoose');



// const DATABASE_URL="mongodb://localhost:27017/shopping"
const DATABASE_URL="mongodb+srv://dbneo:neo3120@cluster0.m1pot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",(error)=>console.error(error));
db.once('open',()=>console.log('Connected to Database ...'));


var products=[
    new Product({
        imagePath:"https://i.imgur.com/pQMplfB.jpg",
        title:'18" AT Tire',
        description:"18 inches all terrain tire",
        width:230,
        aspectRatio:65,
        diameter:18,
        price:200,
        inStock:18
    }),

    new Product({
        imagePath:"https://i.imgur.com/pQMplfB.jpg",
        title:'20" AT Tire',
        description:"20 inches all terrain tire",
        price:250,
        size:20
    }),
    new Product({
        imagePath:"https://i.imgur.com/GFO9a2w.jpg",
        title:'17" All Season Tire',
        description:"17 inches all season tire",
        price:150,
        size:17
    }),
    new Product({
        imagePath:"https://i.imgur.com/GFO9a2w.jpg",
        title:'19" All Season Tire',
        description:"19 inches all season tire",
        price:200,
        size:19
    }),
    new Product({
        imagePath:"https://i.imgur.com/2Ev56dW.png",
        title:'17" Winter Tire',
        description:"17 inches winter tire",
        price:200,
        size:17
    }),
    new Product({
        imagePath:"https://i.imgur.com/2Ev56dW.png",
        title:'19" Winter Tire',
        description:"19 inches winter tire",
        price:250,
        size:19
    })

];


var done=0;
for (var i=0;i<products.length;i++){
    products[i].save((err,result)=>{
        done++;
        if(done==products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
