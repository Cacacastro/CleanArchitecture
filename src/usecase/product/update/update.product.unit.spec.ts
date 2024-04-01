import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "Product 1", 10);

const input = {
    id: "1",
    name: "Product 2",
    price: 20,
};

const mockRepository = () =>{
    return{
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    };
};

describe("Unit test for update product use case", () =>{
    it("should update a product", async() =>{
        const productRepository = mockRepository();
        const useCase = new UpdateProductUseCase(productRepository);

        const result = await useCase.execute(input);
        expect(result).toEqual(input);
    });
});