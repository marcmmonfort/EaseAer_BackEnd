import { Types } from "mongoose";
import { ProductEntity } from "../../domain/product/product.entity";
import { ProductRepository } from "../../domain/product/product.respository";
import ProductModel from "../model/product.schema";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

export class MongoProductRepository implements ProductRepository {

    // CASE 1: createProduct(data: ProductEntity): Promise<ProductEntity | null | string>;
    async createProduct(data: ProductEntity): Promise<any> {
        const {
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct
        } = data;
        const checkIs = await ProductModel.findOne({ codeProduct });
        if (checkIs) return "CODE_ALREADY_USED";
        const sameData = {
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct
        };
        const product = await ProductModel.create(sameData);
        const updatedData = {
            uuid: product._id,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct
        };
        const response = await ProductModel.findOneAndUpdate(
            { _id: updatedData.uuid },
            updatedData,
            { new: true }
        );
        return response;
    }

    // CASE 2: getProductById(uuid: string): Promise<ProductEntity | null>;
    async getProductById(uuid: string): Promise<any> {
        const response = await ProductModel.findOne({ _id: uuid });
        return response;
    }

    // CASE 3: getProductsByName(name: string): Promise<ProductEntity[] | null>;
    async getProductsByName(name: string): Promise<any> {
        const products = await ProductModel.find({ nameProduct: name });
        if (!products) {
            return "NOT_FOUND_PRODUCTS";
        }
        return products;
    }

    // CASE 4: getProductByCode(code: string): Promise<ProductEntity | null>;
    async getProductByCode(code: string): Promise<any> {
        const product = await ProductModel.findOne({ codeProduct: code });
        if (!product) {
            return "NOT_FOUND_PRODUCT";
        }
        return product;
    }

    // CASE 5: updateProduct(uuid: string, data: ProductEntity): Promise<ProductEntity | null>;
    async updateProduct(uuid: string, data: ProductEntity): Promise<any> {
        const response = await ProductModel.findOneAndUpdate({ _id: uuid }, data, { new: true });
        return response;
    }

    // CASE 6: deleteProduct(uuid: string): Promise<ProductEntity | null>;
    async deleteProduct(uuid: string): Promise<any> {
        const response = await ProductModel.findOneAndRemove({ _id: uuid });
        return response;
    }

    // CASE 7: getNumProducts(): Promise<string | null>; 
    async getNumProducts(): Promise<any> {
        const response = (await ProductModel.countDocuments({})).toString();
        return response;
    }   

    // CASE 8: listProducts(): Promise<ProductEntity[] | null>;
    async listProducts(): Promise<any> {
        const response = await ProductModel.find();
        return response;
    }

    // CASE 9: listProductsPag(numPage: string): Promise<ProductEntity[] | null>;
    async listProductsPag(numPage: string): Promise<any> {
        const items = 2; // Definir aquí la cantidad de productos a mostrar por página.
        const hop = (parseInt(numPage, 10) - 1) * items;
        const response = await ProductModel.find({}).skip(hop).limit(items).exec();
        return response;
    }
}
