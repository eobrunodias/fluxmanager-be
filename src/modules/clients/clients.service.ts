import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "./entities/client.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    if (!createClientDto) throw new BadRequestException("Invalid data client");

    const clientCreated = this.repository.create(createClientDto);
    const clientSaved = await this.repository.save(clientCreated);

    return clientSaved;
  }

  async findAll() {
    const clients = await this.repository.find();

    if (!clients) throw new ConflictException("Clients not found");

    return clients;
  }

  findOne(id: string) {
    return `This action returns a #${id} client`;
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: string) {
    return `This action removes a #${id} client`;
  }
}
