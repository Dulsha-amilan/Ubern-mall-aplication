const router =  require("express").Router();
let Item = require("../Model/Item");
const Shop = require("../Model/Shop");
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


router.route("/add").post(upload.single("filepath"), async (req, res) => {
    try {
        const { ItemID, name, price, category, description, count, join, selectedShop } = req.body;

        // Retrieve the selected shop details from the database
        const shop = await Shop.findById(selectedShop);

        const newItem = new Item({
            ItemID,
            name,
            filepath: req.file.filename,
            price,
            category,
            description,
            count,
            join,
            shop: shop // Associate the shop with the item
        });

        await newItem.save();
        res.json("Item Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error adding item" });
    }
});
router.route("/").get((req,res)=>{

    Item.find().then((Item)=>{
        res.json(Item)
    }).catch((err)=>{
        console.log(err);
    })
})

// In your item router
router.route("/shop/:shopId").get(async (req, res) => {
    try {
      const items = await Item.find({ shop: req.params.shopId });
      res.json(items);
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: "Error getting items for this shop" });
    }
  });
  

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

