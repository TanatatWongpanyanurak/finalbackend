const Type = require("../models/type");
const Product = require("../models/product");
const config = require("../config/index");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const {validationResult} = require('express-validator')

//get all data
exports.type = async (req, res, next) => {
  const types = await Type.find()
  const PetType = types.map((type, index) => {
    return {
      id: type._id,
      pet: type.pet,
    };
  });

  res.status(200).json({
    data: PetType,
  });
};
exports.product = async (req, res, next) => {
  const product = await Product.find().populate("type");
  res.status(200).json({
    data: product,
  });
};
exports.show = async (req, res, next) => {
  const type = await Type.findById(req.params.id).populate("product");
  res.status(200).json({
    data: type,
  });
};
exports.insert = async (req, res, next) => {
  try{
  const { name,price,type } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
      error.statusCode = 422;
      error.validation = errors.array()
      throw error;
  }
  let product = new Product({
    name: name,
    price: price,
    type:type,
  });
  await product.save();

  res.status(200).json({
    message: "เพิ่มอาหารสัตว์เรียบร้อยแล้ว",
  });
} catch(error){
  next(error);
}
exports.destroy = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.deleteOne({
        _id: id,
      });
  
      if (product.deleteCount === 0) {
        const error = new Error("ไม่สามารถลบข้อมูลได้");
        error.statusCode = 400;
        throw error;
      } else {
        res.status(200).json({
          message: "ลบข้อมูลเรียบร้อยแล้ว",
        });
      }
    } catch (error) {
       next(error)
    }
  };
  exports.update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const product = await Product.updateOne(
        { _id: id },
        {
          name: name,
          price: price,
        }
      );
      console.log(product)
      if(staff.nModified === 0){
      const error = new Error("ไม่สามารถอัปเดตข้อมูลได้")
         error.statusCode = 400
         throw error;
      }
      else{
      res.status(200).json({
        message: "อัปเดตข้อมูลเรียบร้อยแล้ว",
      })};
    } catch (error) {
      next(error)
    }
  };
};
