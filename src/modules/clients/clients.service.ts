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

    const existingClient = await this.repository.findOneBy({
      email: createClientDto.email,
    });
    if (existingClient)
      throw new ConflictException("Client with this email already exists");

    const clientCreated = this.repository.create(createClientDto);
    if (!clientCreated) throw new ConflictException("Client not created");

    const clientSaved = await this.repository.save(clientCreated);
    if (!clientSaved) throw new ConflictException("Client not saved");

    return clientSaved;
  }

  async findAll() {
    const clients = await this.repository.find();
    if (!clients) throw new ConflictException("Clients not found");

    return clients;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const client = await this.repository.findOneBy({ id });
    if (!client) throw new ConflictException("Client not found");

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateClientDto)
      throw new BadRequestException("Invalid data update client");

    const client = await this.repository.findOneBy({ id });
    if (!client) throw new ConflictException("Client not found");

    const clientUptaded = {
      ...client,
      ...updateClientDto,
    };

    const clientPreload = await this.repository.preload(clientUptaded);
    if (!clientPreload) throw new ConflictException("Client not preloaded");

    const clientSaved = await this.repository.save(clientPreload);
    if (!clientSaved) throw new ConflictException("Client not saved");

    return clientSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const client = await this.repository.findOneBy({ id });
    if (!client) throw new ConflictException("Client not found");

    const clientRemoved = await this.repository.delete({ id });
    if (!clientRemoved) throw new ConflictException("Client not removed");

    return client;
  }
}
