const router = require('express').Router();
const { Product, Store } = require('../../models');

//Display all products in order by rating
router.get('/', (req, res) => {
    Product.findAll({
        order: [['rating', 'DESC']],
        attributes: [
            'id',
            'product_name',
            'category',
            'price',
            'rating'
        ]
        //commented out store references until store routes are complete
        // include: [
        //     {
        //         model: Store,
        //         attributes: ['store_name']
        //     }
        // ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
        })
});

//Display individual product by id
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'product_name',
            // 'description',
            // 'category',
            // 'size',
            // 'price',
            'rating'
        ],
        //commented out store references until store routes are complete
        // include: [
        //     {
        //     model: Store,
        //     attributes: ['store_name', 'city', 'state'],
        //     }]
    })
    .then(dbProductData => {
        if(!dbProductData) {
            res.status(404).json({ message: 'No product found with this id'});
            return;
         }
         res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);   
    })
});

//Add a new product
router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        rating: req.body.rating,
        user_id: req.body.user_id,
        store_id: req.body.store_id 
}) 
.then(dbProductData => res.json(dbProductData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//Update product
router.put('/:id', (req, res) => {
    Product.update(req.body, {
            where: {
               id: req.params.id 
            }
        }
    )
    .then(dbProductData => {
        if(!dbProductData) {
            res.status(404).json({ message: 'No product found with this id'});
            return;
         }
         res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router
