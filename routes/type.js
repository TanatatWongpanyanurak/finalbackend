var express = require('express');
var router = express.Router();
const typeController = require('../controllers/typeController')
const {body} = require('express-validator')
const types = require('../models/type')
const passport = require('../middleware/passportJWT')
const checkadmin = require('../middleware/checkAdmin')
/* GET users listing. */
router.get('/',[passport.isLogin],typeController.type );
router.get('/product',typeController.product );
router.get('/:id', typeController.show);
router.post('/',[body('name').not().isEmpty().withMessage("กรุณาใส้ชื่ออาหารด้วยครับ"),passport.isLogin,checkadmin.isAdmin],typeController.insert);
router.post('/addtype',[body('pet').not().isEmpty().withMessage("กรุณากรอกประเภทสัตว์ด้วยครับ"),passport.isLogin,checkadmin.isAdmin],typeController.inserttype);
router.get('/check',typeController.destoy);
module.exports = router;