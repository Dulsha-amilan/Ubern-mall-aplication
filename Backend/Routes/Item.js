const router =  require("express").Router();
let Item = require("../Model/Item");

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter })


router.route("/add").post(upload.single("filepath"),(req,res)=>{

    const ItemID = req.body.ItemID;
    const name = req.body.name;
    const filepath = req.file.filename;
    const price = Number( req.body.price);
    const catogory = req.body.catogory;
    const description=req.body.description;
    const count=Number(req.body.count) ;
    const join = req.body.join;

    const newItem = new Item({
        ItemID,
        name,
        filepath,  
        price,   
        catogory,
        description,
        count,

        join
        
    })

    console.log(req.file)

    newItem.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Item.find().then((Item)=>{
        res.json(Item)
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/count").get(async (req, res) => {
    try {
        const count = await Item.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error getting Item count" });
    }
});

module.exports = router;

