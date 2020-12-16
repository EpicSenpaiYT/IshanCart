const Product = require('../model/shop')



exports.getprodcuts = async (req, res) => {

   const product = await Product.find()

   if (req.session.isLoggedIn == undefined) {
      return res.render('shop/shop.ejs', { prod: product, isAuthenticated: false })
   }
   res.render('shop/shop.ejs', {
      prod: product,
      isAuthenticated: req.session.isLoggedIn,
      user_name: req.session.user_name,
      role: req.session.role,
   })


}




exports.get_product_detail = async (req, res) => {
   prod_Id = req.params.id
   const prod_detail = await Product.findById(prod_Id)
   res.render('shop/product_detail.ejs', {
      prod: prod_detail,
      isAuthenticated: req.session.isLoggedIn,
      user_name: req.session.user_name,
      role: req.session.role,
   })

}



exports.add_to_Cart = async (req, res) => {
   const prodId = req.params.id

   Product.findById(prodId)
      .then(product => {
         return req.user.addToCart(product);
      })
      .then(result => {
         res.redirect('/')
      });


}


exports.get_cart = (req, res) => {

   req.user.populate('cart.items.productId')
      .execPopulate()
      .then(cart => {
         res.render('shop/cart.ejs', {
            isAuthenticated: req.session.isLoggedIn,
            user_name: req.session.user_name,
            cart_items : cart.cart.items,
            role: req.session.role,
         })
      })

}




exports.delete_cart_item = async (req, res) => {

   cart_item_id = req.params.id
   index = 0

   for (let item of req.user.cart.items) {
       if (item._id == cart_item_id) {
           break;
       }
       index++;
   }

   req.user.cart.items.splice(index, 1)
   await req.user.save()

   res.redirect('/cart')

}
