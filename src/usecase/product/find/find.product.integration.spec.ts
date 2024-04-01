import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {

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

    it("should find a product", async() => {
        const product = new Product("1", "Product 1", 10);
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const useCase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        }

        const output = {
            id: "1",
            name: "Product 1",
            price: 10,
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

});