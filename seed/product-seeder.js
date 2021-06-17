var Product=require('../models/product');
var mongoose=require('mongoose');



// const DATABASE_URL="mongodb://localhost:27017/shopping"
const DATABASE_URL="mongodb+srv://dbneo:@cluster0.m1pot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology: true});
const db=mongoose.connection;
db.on("error",(error)=>console.error(error));
db.once('open',()=>console.log('Connected to Database ...'));


var products=[
    // AT tires
    new Product({
        imagePath:"https://i.imgur.com/9VwXoiF.png",
        title:'CAPSULE AT Tire',
        description:"18 inches all terrain tire",
        width:255,
        aspectRatio:55,
        diameter:18,
        price:289,
        inStock:18
    }),
    new Product({
        imagePath:"https://i.imgur.com/9VwXoiF.png",
        title:'CAPSULE AT Tire',
        description:"17 inches all terrain tire",
        width:265,
        aspectRatio:70,
        diameter:17,
        price:269,
        inStock:20
    }),
    //MT tires
    new Product({
        imagePath:"https://i.imgur.com/pAQiCrD.png",
        title:'CAPSULE MT Tire',
        description:"17 inches mud terrain tire",
        width:265,
        aspectRatio:70,
        diameter:17,
        price:279,
        inStock:16
    }),
    new Product({
        imagePath:"https://i.imgur.com/pAQiCrD.png",
        title:'CAPSULE MT Tire',
        description:"16 inches mud terrain tire",
        width:265,
        aspectRatio:75,
        diameter:16,
        price:259,
        inStock:26
    }),
    //Sport tires
    new Product({
        imagePath:"https://i.imgur.com/EmH0xgu.png",
        title:'CAPSULE Sport Tire',
        description:"16 inches sport tire",
        width:225,
        aspectRatio:70,
        diameter:16,
        price:299,
        inStock:27
    }),
    new Product({
        imagePath:"https://i.imgur.com/EmH0xgu.png",
        title:'CAPSULE Sport Tire',
        description:"17 inches sport tire",
        width:225,
        aspectRatio:60,
        diameter:17,
        price:319,
        inStock:12
    }),
    new Product({
        imagePath:"https://i.imgur.com/EmH0xgu.png",
        title:'CAPSULE Sport Tire',
        description:"18 inches sport tire",
        width:225,
        aspectRatio:55,
        diameter:18,
        price:339,
        inStock:22
    }),
    //performence tires
    new Product({
        imagePath:"https://i.imgur.com/XlVWKtb.png",
        title:'CAPSULE Performence Tire',
        description:"18 inches performence tire",
        width:225,
        aspectRatio:40,
        diameter:18,
        price:369,
        inStock:16
    }),
    new Product({
        imagePath:"https://i.imgur.com/XlVWKtb.png",
        title:'CAPSULE Performence Tire',
        description:"17 inches performence tire",
        width:225,
        aspectRatio:45,
        diameter:17,
        price:349,
        inStock:18
    }),
    new Product({
        imagePath:"https://i.imgur.com/XlVWKtb.png",
        title:'CAPSULE Performence Tire',
        description:"17 inches performence tire",
        width:225,
        aspectRatio:60,
        diameter:17,
        price:349,
        inStock:16
    }),
    //winter tires-1
    new Product({
        imagePath:"https://i.imgur.com/xWZIliG.png",
        title:'CAPSULE Winter Tire',
        description:"17 inches winter tire",
        width:225,
        aspectRatio:65,
        diameter:17,
        price:189,
        inStock:36
    }),
    new Product({
        imagePath:"https://i.imgur.com/xWZIliG.png",
        title:'CAPSULE Winter Tire',
        description:"16 inches winter tire",
        width:225,
        aspectRatio:65,
        diameter:16,
        price:179,
        inStock:28
    }),
    //winter tires
    new Product({
        imagePath:"https://i.imgur.com/v07JBkU.png",
        title:'CAPSULE Advanced Winter Tire',
        description:"17 inches advanced winter tire",
        width:225,
        aspectRatio:55,
        diameter:17,
        price:209,
        inStock:25
    }),
    new Product({
        imagePath:"https://i.imgur.com/v07JBkU.png",
        title:'CAPSULE Advanced Winter Tire',
        description:"18 inches advanced winter tire",
        width:225,
        aspectRatio:45,
        diameter:18,
        price:229,
        inStock:18
    }),
    //all season tires
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"18 inches all season tire",
        width:225,
        aspectRatio:55,
        diameter:18,
        price:209,
        inStock:17
    }),
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"17 inches all season tire",
        width:205,
        aspectRatio:50,
        diameter:17,
        price:179,
        inStock:34
    }),
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"17 inches all season tire",
        width:205,
        aspectRatio:50,
        diameter:17,
        price:179,
        inStock:34
    }),
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"16 inches all season tire",
        width:205,
        aspectRatio:55,
        diameter:16,
        price:159,
        inStock:34
    }),
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"15 inches all season tire",
        width:195,
        aspectRatio:55,
        diameter:15,
        price:149,
        inStock:34
    }),
    new Product({
        imagePath:"https://i.imgur.com/P6qdvvw.png",
        title:'CAPSULE All Season Tire',
        description:"14 inches all season tire",
        width:185,
        aspectRatio:60,
        diameter:14,
        price:139,
        inStock:30
    }),
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
