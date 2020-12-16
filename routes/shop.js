const express = require('express')
const router = express.Router();


const shopController = require('../controller/controller_shop')


router.get('/',  shopController.getprodcuts)

router.get('/detail/:id'  , shopController.get_product_detail)

router.get('/add_to_cart/:id',   shopController.add_to_Cart);

router.get('/cart',   shopController.get_cart);

router.get('/cart/delete/:id', shopController.delete_cart_item )

module.exports = router