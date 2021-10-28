import { Specification } from '../../model/Specification';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationRepository';

class SpecficationRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecficationRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecficationRepository {
    if (!SpecficationRepository.INSTANCE) {
      SpecficationRepository.INSTANCE = new SpecficationRepository();
    }
    return SpecficationRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByname(name: string): Specification {
    const specification = this.specifications.find(
      specification => specification.name === name,
    );
    return specification;
  }
  list(): Specification[] {
    return this.specifications;
  }
}

export { SpecficationRepository };
