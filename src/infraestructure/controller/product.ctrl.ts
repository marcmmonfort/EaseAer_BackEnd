import { uploadUser } from "./multer/userMulter.ctrl";
import { ProductUseCase } from "../../application/productUseCase";
import { Request, Response } from "express";
import { EmailService, NodemailerEmailService } from "../emailSender/emailSender";
import { ProductEntity } from "../../domain/product/product.entity";
import { cloudinary } from "../utils/cloduinary.handle";
import { isImageFile } from "../utils/isImage.handle";
import { ProductValue } from "../../domain/product/product.value";

export class ProductController {
    emailService: EmailService;
    constructor(private productUseCase: ProductUseCase) {
        this.emailService = new NodemailerEmailService();
        this.createProductCtrl = this.createProductCtrl.bind(this);
        this.getProductByIdCtrl = this.getProductByIdCtrl.bind(this);
        this.getProductsByNameCtrl = this.getProductsByNameCtrl.bind(this);
        this.getProductByCodeCtrl = this.getProductByCodeCtrl.bind(this);
        this.updateProductCtrl = this.updateProductCtrl.bind(this);
        this.deleteProductCtrl = this.deleteProductCtrl.bind(this);
        this.getNumProductsCtrl = this.getNumProductsCtrl.bind(this);
        this.listProductsCtrl = this.listProductsCtrl.bind(this);
        this.listProductsPagCtrl = this.listProductsPagCtrl.bind(this);
    }

    // CASE 1: createProduct(data: ProductEntity): Promise<ProductEntity | null | string>;
    public async createProductCtrl(req: Request, res: Response) {
        const {
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct
        } = req.body;
        try {
            const product = new ProductValue({
                uuid: uuid,
                nameProduct: nameProduct,
                descriptionProduct: descriptionProduct,
                codeProduct: codeProduct,
                deletedProduct: deletedProduct,
            });
            const response = await this.productUseCase.createProduct(product);
            res.send(response);
        } catch (error) {
            console.log("CANNOT_CREATE_PRODUCT");
        }
    }

    // CASE 2: getProductById(uuid: string): Promise<ProductEntity | null>;
    public async getProductByIdCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.productUseCase.getProductById(`${uuid}`);
        res.send(response);
    }

    // CASE 3: getProductsByName(name: string): Promise<ProductEntity[] | null>;
    public async getProductsByNameCtrl({ params }: Request, res: Response) {
        const { name = "" } = params;
        const response = await this.productUseCase.getProductsByName(`${name}`);
        res.send(response);
    }

    // CASE 4: getProductByCode(code: string): Promise<ProductEntity | null>;
    public async getProductByCodeCtrl({ params }: Request, res: Response) {
        const { code = "" } = params;
        const response = await this.productUseCase.getProductByCode(`${code}`);
        res.send(response);
    }

    // CASE 5: updateProduct(uuid: string, data: ProductEntity): Promise<ProductEntity | null>;
    public async updateProductCtrl(req: Request, res: Response) {
        const {
            uuid,
            nameProduct,
            descriptionProduct,
            codeProduct,
            deletedProduct,
        } = req.body;
        try {
            const user = new ProductValue({
                uuid: uuid,
                nameProduct: nameProduct,
                descriptionProduct: descriptionProduct,
                codeProduct: codeProduct,
                deletedProduct: deletedProduct,
            });
            const response = await this.productUseCase.updateProduct(uuid, user);
            res.send(response);
        } catch (error) {
            console.log("UpdateUserCtrl Not Working");
        }
    }

    // CASE 6: deleteProduct(uuid: string): Promise<ProductEntity | null>;
    public async deleteProductCtrl({ params }: Request, res: Response) {
        const { uuid = "" } = params;
        const response = await this.productUseCase.deleteProduct(`${uuid}`);
        res.send(response);
    }

    // CASE 7: getNumProducts(): Promise<string | null>;
    public async getNumProductsCtrl(req: Request, res: Response) {
        const response = await this.productUseCase.getNumProducts();
        const data = response ? response : "NOT_FOUND";
        res.send(data);
    }

    // CASE 8: listProducts(): Promise<ProductEntity[] | null>;
    public async listProductsCtrl(req: Request, res: Response) {
        const response = await this.productUseCase.listProducts();
        res.send(response);
    }

    // CASE 9: listProductsPag(numPage: string): Promise<ProductEntity[] | null>;
    public async listProductsPagCtrl({ params }: Request, res: Response) {
        const { numPage = "" } = params;
        const response = await this.productUseCase.listProductsPag(`${numPage}`);
        res.send(response);
    }

}
