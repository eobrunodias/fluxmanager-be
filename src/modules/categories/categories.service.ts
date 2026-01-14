import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoriesRepository } from "./repositories/categories.repository";

@Injectable()
export class CategoriesService {
  constructor(private readonly repository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    if (!createCategoryDto)
      throw new BadRequestException("Invalid data category");

    return this.repository.createCategory(createCategoryDto);
  }

  async findAll() {
    return this.repository.findAllCategories();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return await this.repository.findCategoryById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateCategoryDto)
      throw new BadRequestException("Category data update invalid");

    return this.repository.updatedCategory(id, updateCategoryDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteCategory(id);
  }
}
