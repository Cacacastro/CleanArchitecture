import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product 1", 10);

const mockRepository = () =>{
    return {
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
}

describe("Unit test find product use case", () =>{
    it("should find a product", async() => {
        const productRepository = mockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1",
        };

        const output ={
            id: "1",
            name: "Product 1",
            price: 10,
        };

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", () =>{
        const productRepository = mockRepository();
        productRepository.find.mockImplementation(() =>{
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);
        const input = {
            id: "2",
        };

        expect(() =>{
            return usecase.execute(input);
        }).rejects.toThrow("Product not found");
    });
});