var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const passport = require('../middleware/passportJWT');
/* GET users listing. */
router.get("/", userController.index);
router.get("/bio", userController.bio);
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("กรุณาป้อนชื่อสกุลด้วย"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("กรุณาป้อนอีเมลด้วย")
      .isEmail()
      .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("กรุณากรอกรหัสผ่านด้วย")
      .isLength({ min: 5 })
      .withMessage("รหัสผ่านต้องมีค่ามากกว่า 5 ตัวอักษรขึ้นไป"),
  ],
  userController.register
),
  router.post(
    "/login",
    [
      body("email")
        .not()
        .isEmpty()
        .withMessage("กรุณาป้อนอีเมลด้วย")
        .isEmail()
        .withMessage("รูปแบบอีเมลไม่ถูกต้อง"),
      body("password")
        .not()
        .isEmpty()
        .withMessage("กรุณากรอกรหัสผ่านด้วย")
        .isLength({ min: 5 })
        .withMessage("รหัสผ่านต้องมีค่ามากกว่า 5 ตัวอักษรขึ้นไป"),
    ],

    userController.log
  );
  router.get("/me",[passport.isLogin],userController.profile)

  router.delete('/:id',userController.destroy)
  router.put('/:id',userController.update)

module.exports = router;