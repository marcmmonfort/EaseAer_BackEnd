import { Router } from "express";
import { ProductUseCase } from "../../application/productUseCase";
import { MongoProductRepository } from "../repository/mongoProduct.repository";
import { ProductController } from "../controller/product.ctrl";
import { logMiddleware } from "../controller/login.ctrl";
import { checkJwt } from "../controller/session.ctrl";

const routeProduct = Router();

const productRepo = new MongoProductRepository();
const productUseCase = new ProductUseCase(productRepo);
const productCtrl = new ProductController(productUseCase);

routeProduct.post("/product/create", productCtrl.createProductCtrl);
routeProduct.get("/product/getbyid/:uuid", checkJwt, productCtrl.getProductByIdCtrl);
routeProduct.get("/product/getbyname/:name", productCtrl.getProductsByNameCtrl);
routeProduct.get("/product/getbycode/:code", productCtrl.getProductsByNameCtrl);
routeProduct.put("/product/update/:uuid", checkJwt, productCtrl.updateProductCtrl);
routeProduct.delete("/product/delete/:uuid", checkJwt, productCtrl.deleteProductCtrl);
routeProduct.get("/product/all/count/docs", checkJwt, productCtrl.getNumProductsCtrl);
routeProduct.get("/product/listproducts/all", checkJwt, productCtrl.listProductsCtrl);
routeProduct.get("/product/listproductspag/:numPage", checkJwt, productCtrl.listProductsPagCtrl);

export default routeProduct;
