import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class NotebookController implements Crud {
  constructor(private readonly citi = new Citi("Notebook")) {}
  create = async (request: Request, response: Response) => {
    const { name, description, price, color, stock } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      name,
      price,
      color,
      stock
    );
    if (isAnyUndefined) return response.status(400).send();

    const newNotebook = { name, description, price, color, stock };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(
      newNotebook
    );

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, description, price, color, stock } = request.body;

    const updatedValues = { name, description, price, color, stock };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };
}

export default new NotebookController();
