import { Router } from 'express';
import { getMockProducts, createProduct } from "../controllers/productController.js";

const router = Router();

router.get('/mockingproducts', getMockProducts);
router.post('/', createProduct);

export default router;