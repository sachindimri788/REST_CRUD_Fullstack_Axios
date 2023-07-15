const User = require("../models/userModel");

exports.getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    }
    catch (e) {
        
        return res.status(500).json({ message:"failed" })
    }
};

exports.addUser = async (req, res) => {
    try {
        const { selling, product,category } = req.body;
        const user = await User.create({
            selling, product,category
        })
        return res.json({ message: "success" })
    }
    catch (e) {
        return res.status(500).json({ message: "failed" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { selling, product,category } = req.body;
        const user = await User.findOne({ where: { id } });
        user.selling = selling;
        user.product = product;
        user.category=category;
        await user.save();
        return res.json({ message: "success" })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "failed" })
    }
}

exports.delteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { id } });
        await user.destroy();
        return res.json({ message: "success" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "failed" });
    }
};
