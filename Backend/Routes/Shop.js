const router =  require("express").Router();
let Shop = require("../Model/Shop");

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

    const ShopID = req.body.ShopID;
    const name = req.body.name;
    const filepath = req.file.filename;
    const contact = Number( req.body.contact);
    const catogory = req.body.catogory;
    const join = req.body.join;

    const newShop = new Shop({
        ShopID,
        name,
        filepath,     
        contact,
        catogory,
        join
        
    })

    console.log(req.file)

    newShop.save().then(()=>{
        res.json("Shop Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Shop.find().then((shop)=>{
        res.json(shop)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const{ShopID,name, filepath,contact,catogory,join} = req.body;

    const updateShop = {
        ShopID,
        name,
        filepath,
        contact,
        catogory,
        join
    }

    const update = await Shop.findByIdAndUpdate(userId,updateShop)
    .then(() =>{
        res.status(200).send ({status: "User updated"})

    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with updatingh data"});
    })
})

router.route("/delete/:id").delete(async (req , res) => {
    let userId = req.params.id;

    await Shop.findByIdAndDelete(userId)
     .then(() =>{
        res.status(200).send({status:" Shop deleted "});
     }).catch ((err)=>{
        console.log(err.message);
        res.status(500).send({status: "error with delete shop", error: err.message});
     })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;
    const user = await Shop.findById(userId)
    .then((shop) =>{
        res.status(200).send({status: "User fetched", shop})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
});
router.route("/count").get(async (req, res) => {
    try {
        const count = await Shop.countDocuments();
        res.json({ count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ error: "Error getting Shop count" });
    }
});

module.exports = router;

