import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () =>{
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

    it("should create a product", async () =>{
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const input ={
            name: "Product 1",
            price: 10,
        };

        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 10
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
});