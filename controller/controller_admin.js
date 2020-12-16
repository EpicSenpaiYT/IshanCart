const Product = require('../model/shop')

exports.getAdmin = async (req, res) => {

    const product = await Product.find()
    res.render('admin/admin.ejs', {
        prod: product,
        isAuthenticated: req.session.isLoggedIn,
        user_name: req.session.user_name,
        role: req.session.role,
    })
}


exports.addProduct = (req, res) => {
    res.render('admin/add-product.ejs', {
        isAuthenticated: req.session.isLoggedIn,
        user_name: req.session.user_name ,
        role: req.session.role,
    })

}



exports.createProduct = (req, res) => {

    const title = req.body.title;
    const imgUrl = req.body.imgUrl;
    const price = req.body.price;
    const description = req.body.description;

    // console.log(req.body)

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imgUrl: imgUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.deleteProduct = async (req, res) => {
    prodId = req.params.id

    Product.findByIdAndDelete(prodId)
        .then((result) => {
            res.redirect('/admin')
        })
        .catch((err) => {
            console.log(err)
        })

}

exports.editProduct = async (req, res) => {
    prodId = req.params.id
    const product = await Product.findById(prodId)
    res.render('admin/edit-product', {
        prod: product,
        isAuthenticated: req.session.isLoggedIn,
        user_name: req.session.user_name ,
        role: req.session.role,
    })
}


exports.updateProduct = async (req, res) => {
    prodId = req.body.id
    const product = await Product.findById(prodId)
    product.title = req.body.title
    product.imgUrl = req.body.imgUrl
    product.price = req.body.price
    await product.save()

    res.redirect('/')

}