import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test listing products", () =>{
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
    it("should list a products", async() =>{
        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);

        productRepository.create(product1);
        productRepository.create(product2);

        const useCase = new ListProductUseCase(productRepository);
        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
});