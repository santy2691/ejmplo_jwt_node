const Product = require('../models/Products');

const createProduct = async (req,res)=>{
    console.log(req.body);
    let product = new Product(req.body);
    try {
        let newProduct = await product.save();
        res.json({
            success : true,
            product : newProduct
        });
    } catch (error) {
        res.json("error");
    }

}

 const getProducts = async (req,res)=>{
     try {
        let products = await Product.find();
        res.json({
            products: products
        });   
     } catch (error) {
         res.json("error");
     }
}


 const getProductById = async (req,res)=>{
    let product = await Product.findById(req.params.productId);
    res.status(200).json({
        product: product
    });
}


 const updateProductById = async (req,res)=>{
    let product = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {
            new: true
    });
    res.status(200).json({
        product: product
    })
}


 const deletePRoductById = async (req,res)=>{
     console.log(req.params.productId);
     let product = await Product.findByIdAndDelete(req.params.productId);
     res.status(200).json({
         delete : product
     });

}


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deletePRoductById,
}