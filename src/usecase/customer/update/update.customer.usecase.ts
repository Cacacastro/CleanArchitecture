import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequilize/customer.repository";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase{
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepository){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto>{
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));

        await this.customerRepository.update(customer);

        return{
            id:customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city,
            },
        }
    }
}