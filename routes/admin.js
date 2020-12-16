const express = require('express')
const router = express.Router();
const adminController = require('../controller/controller_admin.js')
const isAuth = require('../middleware/is-auth')



router.get('/admin',  adminController.getAdmin)

router.get('/admin/add-product', isAuth ,   adminController.addProduct)

router.post('/admin/add-product', isAuth ,   adminController.createProduct)

router.get('/admin/delete/:id', isAuth ,  adminController.deleteProduct)

router.get('/admin/edit-product/:id', isAuth ,   adminController.editProduct)

router.post('/admin/edit-product', isAuth ,  adminController.updateProduct)



module.exports = router