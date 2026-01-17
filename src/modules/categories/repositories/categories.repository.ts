import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateCategoryDto } from "../dto/update-category.dto";
import { CreateCategoryDto } from "../dto/create-category.dto";

export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const categoryExists = await this.repository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (categoryExists) {
      throw new ConflictException("Category already exists");
    }

    const categoryCreated = this.repository.create(createCategoryDto);
    return await this.repository.save(categoryCreated);
  }

  async findAllCategories(): Promise<Category[]> {
    const categories: Category[] = await this.repository.find();
    if (!categories || categories.length === 0)
      throw new NotFoundException("Categories not found");
    return categories;
  }

  async findCategoryById(id: string): Promise<Category> {
    const category: Category | null = await this.repository.findOneBy({ id });
    if (!category) throw new NotFoundException("Category not found");

    return category;
  }

  async updatedCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const categoryPrealoaded: Category | undefined =
      await this.repository.preload({
        id,
        ...updateCategoryDto,
      });

    if (!categoryPrealoaded) throw new NotFoundException("Category Not Found");

    return await this.repository.save(categoryPrealoaded);
  }

  async deleteCategory(id: string): Promise<Category> {
    const category: Category | null = await this.repository.findOneBy({ id });
    if (!category) throw new NotFoundException("Category not found");

    await this.repository.delete(id);

    return category;
  }
}
