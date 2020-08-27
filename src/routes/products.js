// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require("multer");
const productsDataValidator = require("../validators/productsValidator");
const dataTrimmer = require("../middleWares/dataTrimmer");
const multerConfig = require("../config/multerConfig");
const userRoute = require("../middleWares/userRoute");
const sellerRoute = require("../middleWares/sellerRoute");

// ************ Constants ************
const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

// Middleware para trimmear la info de productos
const productsDataTrimmer = dataTrimmer("name", "price", "discount", "description");
// Middleware para la subida de archivos
const upload = multer(multerConfig("products", ALLOWED_MIME_TYPES));

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', userRoute,sellerRoute, productsController.create);

router.post('/create',
            upload.any(),
            productsDataTrimmer,
            productsDataValidator,
            productsController.store);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', userRoute, sellerRoute ,productsController.edit);

router.put('/:id/edit', 
            upload.any(),
            productsDataTrimmer, 
            productsDataValidator,
            productsController.update);


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy);


module.exports = router;