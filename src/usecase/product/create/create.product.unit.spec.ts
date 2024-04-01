import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10,
};

const mockRepository = () =>{
    return{
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
    }
};

describe("Unit test create product use case", () =>{
    it("should create a product", async() =>{
        const productRepository = mockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 10
        };

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it("should throw an error when name is missing", async() =>{
        const productRepository = mockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should throw an error price not must be greater than zero", async() =>{
        const productRepository = mockRepository();
        const useCase = new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = -1;

        await expect(useCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});