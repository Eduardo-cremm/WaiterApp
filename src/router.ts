import path from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express, { Router } from "express";
import multer from 'multer';

import { listCategories } from "./app/useCases/categories/listCategories.js";
import { createCategory } from "./app/useCases/categories/createCategory.js";
import { listProducts } from "./app/useCases/products/listProducts.js";
import { createProduct } from "./app/useCases/products/createProduct.js";
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory.js';
import { listOrders } from './app/useCases/orders/listOrders.js';
import { createOrder } from './app/useCases/orders/createOrder.js';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus.js';
import { cancelOrder } from './app/useCases/orders/cancelOrder.js';

// compute __dirname since we're using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const router = Router();

// parse request bodies so handlers can safely destructure req.body
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
      filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
      },
  }),
});

//List categories
router.get('/categories', listCategories);

//Create category
router.post('/categories', createCategory);

//List products
router.get('/products', listProducts);
;

//Create product
router.post('/products', upload.single('image'), createProduct);

//Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

//List Order
router.get('/orders', listOrders);

// Change Order
router.post('/orders', createOrder);

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel Order
router.delete('/orders/:orderId', cancelOrder);
