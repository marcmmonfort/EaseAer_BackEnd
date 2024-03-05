import { ProductEntity } from "./product.entity";

export interface ProductRepository {

    createProduct(data: ProductEntity): Promise<ProductEntity | null | string>;

    getProductById(uuid: string): Promise<ProductEntity | null>;

    getProductsByName(name: string): Promise<ProductEntity[] | null>;

    getProductByCode(code: string): Promise<ProductEntity | null>;

    updateProduct(uuid: string, data: ProductEntity): Promise<ProductEntity | null>;

    deleteProduct(uuid: string): Promise<ProductEntity | null>;

    getNumProducts(): Promise<string | null>;    

    listProducts(): Promise<ProductEntity[] | null>;

    listProductsPag(numPage: string): Promise<ProductEntity[] | null>;

    // CASE 1: createProduct(data: ProductEntity): Promise<ProductEntity | null | string>;

    // CASE 2: getProductById(uuid: string): Promise<ProductEntity | null>;

    // CASE 3: getProductsByName(name: string): Promise<ProductEntity[] | null>;

    // CASE 4: getProductByCode(code: string): Promise<ProductEntity | null>;

    // CASE 5: updateProduct(uuid: string, data: ProductEntity): Promise<ProductEntity | null>;

    // CASE 6: deleteProduct(uuid: string): Promise<ProductEntity | null>;

    // CASE 7: getNumProducts(): Promise<string | null>;    

    // CASE 8: listProducts(): Promise<ProductEntity[] | null>;

    // CASE 9: listProductsPag(numPage: string): Promise<ProductEntity[] | null>;

}
