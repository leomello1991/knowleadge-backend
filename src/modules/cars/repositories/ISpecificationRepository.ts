import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO{
  name: string;
  description: string;
}

interface ISpecificationRepository{
  create({name, description}: ICreateSpecificationDTO): void;
  findByname(name: string):Specification;
  list(): Specification[]

}

export {ISpecificationRepository, ICreateSpecificationDTO}
