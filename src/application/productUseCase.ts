import { ProductValue } from "../domain/product/product.value";
import { ProductRepository } from "../domain/product/product.respository";
import { NotFoundError } from "./notFoundError";

export class ProductUseCase {
    constructor(private readonly productRepository: ProductRepository) {}

    // CASE 1: createProduct(data: ProductEntity): Promise<ProductEntity | null | string>;
    public createProduct = async ({
        uuid,
        nameProduct,
        descriptionProduct,
        codeProduct,
        deletedProduct,
    }: {
        uuid: string;
        nameProduct: string;
        descriptionProduct: string;
        codeProduct: string;
        deletedProduct: boolean;
    }) => {
        const productValue = new ProductValue({
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct,
        });
        const product = await this.productRepository.createProduct(productValue);
        if (!product) {
        throw new NotFoundError("CANNOT_CREATE_PRODUCT");
        }
        return product;
    };

    // CASE 2: getProductById(uuid: string): Promise<ProductEntity | null>;
    public getProductById = async (uuid: string) => {
        const product = await this.productRepository.getProductById(uuid);
        if (!product) {
        throw new NotFoundError("CANNOT_GET_PRODUCT_BY_ID");
        }
        return product;
    };

    // CASE 3: getProductsByName(name: string): Promise<ProductEntity[] | null>;
    public getProductsByName = async (name: string) => {
        const products = await this.productRepository.getProductsByName(name);
        if (!products) {
            throw new NotFoundError("CANNOT_GET_PRODUCTS_BY_NAME");
        }
        return products;
    };

    // CASE 4: getProductByCode(code: string): Promise<ProductEntity | null>;
    public getProductByCode = async (code: string) => {
        const product = await this.productRepository.getProductByCode(code);
        if (!product) {
            throw new NotFoundError("CANNOT_GET_PRODUCT_BY_CODE");
        }
        return product;
    };

    // CASE 5: updateProduct(uuid: string, data: ProductEntity): Promise<ProductEntity | null>;

    // CASE 6: deleteProduct(uuid: string): Promise<ProductEntity | null>;
    public deleteProduct = async (uuid: string) => {
        const product = await this.productRepository.deleteProduct(uuid);
        return product;
    };

    // CASE 7: getNumProducts(): Promise<string | null>;  
    public getNumProducts = async () => {
        const numProducts = await this.productRepository.getNumProducts();
        return numProducts;
    };  

    // CASE 8: listProducts(): Promise<ProductEntity[] | null>;
    public listProducts = async () => {
        const listOfProducts = await this.productRepository.listProducts();
        if (!listOfProducts) {
            throw new NotFoundError("CANNOT_LIST_PRODUCTS");
        }
        return listOfProducts;
    };

    // CASE 9: listProductsPag(numPage: string): Promise<ProductEntity[] | null>;
    public listProductsPag = async (numPage: string) => {
        const listOfProducts = await this.productRepository.listProductsPag(numPage);
        return listOfProducts;
    };

    // CASE 10: updateUser(uuid: string, data: UserEntity) ---> UserEntity
    public updateProduct = async (
        uuid: string,
        {
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct,
        }: {
            nameProduct: string;
            descriptionProduct: string;
            codeProduct: string;
            deletedProduct: boolean;
        }
    ) => {
        const productValue: ProductValue = new ProductValue({
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct,
        });
        const product = await this.productRepository.updateProduct(uuid, productValue);
        console.log(product);
        if (!product) {
            throw new NotFoundError("PRODUCT_TO_UPDATE_NOT_FOUND");
        }
        return product;
    };

}
