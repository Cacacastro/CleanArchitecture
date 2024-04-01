import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () =>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () =>{
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 10);
        productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "1",
            name: "Product 2",
            price: 20,
        };
        const result = await useCase.execute(input);
        
        expect(result).toEqual(input);
    });
});