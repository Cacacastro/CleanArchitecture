import ProductInterface from "./product.interface";
import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.errors";
import ProductValidatorFactory from "../factory/product.validator.factory";

export default class Product extends Entity implements ProductInterface{

    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors());
        }
    }

    get name(): string{
        return this._name;
    }

    changeName(name: string): void{
        this._name = name;
    }

    get price(): number{
        return this._price;
    }
    
    changePrice(price: number): void{
        this._price = price;
    }

    validate(){
        ProductValidatorFactory.create().validate(this);
    }
}