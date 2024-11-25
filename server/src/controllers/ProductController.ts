import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class ProductController{
    constructor(private readonly citi = new Citi("Product")) {}

    create = async (request:Request, response:Response) => {
        const { name, price, quantity } = request.body;

        const isAnyUndefined = this.citi.areValuesUndefined(
            name,
            price,
            quantity
        );

        if(isAnyUndefined) return response.status(400).send();

        const newProduct = { name, price, quantity };
        const { httpStatus, message } = await this.citi.insertIntoDatabase(newProduct);

        return response.status(httpStatus).send({ message });
    }

    get = async (request:Request, response:Response) => {
        const { httpStatus, values } = await this.citi.getAll();

        return response.status(httpStatus).send(values);
    }

    getById = async (request:Request, response:Response) => {
        const { id } = request.params;

        const { httpStatus, value } = await this.citi.findById(id);

        return response.status(httpStatus).send(value);

    }

    update = async (request:Request, response:Response) => {
        const { id } = request.params;
        const { name, price, quantity } = request.body;

        const updatedValues = { name, price, quantity };

        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
            id,
            updatedValues
        );

        return response.status(httpStatus).send({ messageFromUpdate });
    }

    delete = async (request:Request, response:Response) => {
        const { id } = request.params;

        const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({ messageFromDelete });
    }

}

export default new ProductController();