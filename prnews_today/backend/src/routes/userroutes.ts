import { Router } from 'express';
import UserController from '../controllers/usercontroller';
import ProductController from '../controllers/ProductController';
import upload from '../config/multerconfig';
import { authenticateJWT } from '../Middleware/AuthMiddleware';
import WishListController from '../controllers/WishListController';


const router = Router();
const userController = new UserController();
const productController = new ProductController();

const wishListcontroller = new WishListController();

router.post('/signup', userController.signup.bind(userController));
router.post('/forgetpassword', userController.updatePassword.bind(userController));




router.post('/signin', userController.signin.bind(userController));
router.get('/getallArticles', productController.getAllArticles.bind(productController));
router.get('/getTrendingProducts', productController.getTrendingProducts.bind(productController));
router.get('/getOfferProducts', productController.getOfferProducts.bind(productController));
router.post('/searchProducts', productController.searchProducts.bind(productController));

// router.post('/products', upload.single('image'), productController.createProduct.bind(productController));

// Route for creating a product with image upload and token authentication
router.post('/products',
    upload.fields([
        { name: 'ImageUrl', maxCount: 1 },
        { name: 'SecondImageUrl', maxCount: 1 },
        { name: 'ThirdImageUrl', maxCount: 1 }
      ]), 
    productController.createArticle.bind(productController));

router.get('/getArticleById/:id', productController.getArticleById.bind(productController));
router.get('/gettrendingproducts', productController.getTrendingProducts.bind(productController));
router.get('/getofferproducts', productController.getOfferProducts.bind(productController));



export default router;
