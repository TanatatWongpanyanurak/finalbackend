const User = require("../models/user");
const {validationResult} = require('express-validator')
const config = require("../config/index");
//const {response} = require('express')
const jwt = require('jsonwebtoken')
exports.index = (req, res, next) => {
  //res.send('Hello Kitty');
  res.status(200).json({
    fullname: "Tanatat Wongpunyanurak",
  });
};

exports.bio = (req, res, next) => {
  //res.send('Hello Kitty');
  res.status(200).json({
    fullname: "Tanatat Wongpunyanurakasdf",
  });
};
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
    }

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
       const error = new Error("อีเมลนี้มีผู้ใช้งานในระบบแล้ว")
       error.statusCode = 400
       throw error;
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);

    await user.save();

    res.status(201).json({
      message: "ลงทะเบียนเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
}
exports.log = async (req,res,next) =>{
  try{
    const { email, password } = req.body;
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("ข้อมูลที่ได้รับมาไม่ถูกต้อง")
        error.statusCode = 422;
        error.validation = errors.array()
        throw error;
    }

    // check email isExist
    const user = await User.findOne({ email: email });
    if (!user) {
       const error = new Error("ไม่พบผู้ใช้งาน")
       error.statusCode = 404
       throw error;
        }
        const isValid = await user.checkPassword(password)
        if (!isValid) {
          const error = new Error("รหัสผ่านไม่ถูกต้อง")
          error.statusCode = 401
          throw error;
           }
          const token = await jwt.sign({
            id:user._id,
            role: user.role
          },config.KEY
          ,{ expiresIn: "5 days"})
          
          const expires_in = jwt.decode(token)

  res.status(200).json({
    access_token: token,
    expires_in: expires_in.exp,
    token_type: 'Bearer',
  });
}catch(error){
  next(error)
}
}
exports.profile = (req, res, next) => {
  const {role,name,email} = req.user
  res.status(200).json({
     role:role,
     name:name,
     email:email,
  });
};

