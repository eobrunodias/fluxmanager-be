import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryCreated = this.repository.create(createCategoryDto);
    if (!categoryCreated)
      throw new BadRequestException("Invalid data category");

    const categorySaved = await this.repository.save(categoryCreated);
    if (!categorySaved) throw new ConflictException("Category not saved");

    return categorySaved;
  }

  async findAll() {
    const categories = await this.repository.find();
    if (!categories) throw new ConflictException("Categories not found");

    return categories;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const category = await this.repository.findOneBy({ id });
    if (!category) throw new ConflictException("Category not found");

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
