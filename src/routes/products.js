// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const productsTrimmerMiddleware = require("../middleWares/productsDataTrimmer");
const productsDataValidator = require("../validators/productsValidator");

const diskStorage = require("../utils/diskStorage");
// Middleware para la subida de archivos
const upload = multer({ storage : diskStorage("products") });

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create);

router.post('/create',
            upload.any(),
            productsTrimmerMiddleware,
            productsDataValidator,
            productsController.store);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit);

router.put('/:id/edit', 
            upload.any(),
            productsTrimmerMiddleware, 
            productsDataValidator,
            productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy);


module.exports = router;