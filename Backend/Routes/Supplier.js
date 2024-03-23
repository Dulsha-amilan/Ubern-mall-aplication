const router = require("express").Router();
const { Supplier, validate } = require("../Model/Supplier");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Function to send email
async function sendEmail(SupplierEmail) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                Supplier: process.env.EMAIL_Supplier,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_Supplier,
            to: SupplierEmail,
            subject: 'Account Created Successfully',
            text: 'Dear Supplier,\n\nYour account has been created successfully.\n\nThanks!'
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const Supplier = await Supplier.findOne({ email: req.body.email });
        if (Supplier)
            return res.status(409).send({ message: "Supplier with given email already exists" });
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
         
        await new Supplier({ ...req.body, password: hashPassword }).save();
        
        // Send email notification to Supplier
        await sendEmail(req.body.email);

        res.status(201).send({ message: "Supplier created successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
router.get("/count", async (req, res) => {
    try {
        const count = await Supplier.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/profile", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).send({ message: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        const Supplier = await Supplier.findById(decoded._id).select("-password");
        if (!Supplier)
            return res.status(404).send({ message: "Supplier not found." });

        res.status(200).send(Supplier);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
