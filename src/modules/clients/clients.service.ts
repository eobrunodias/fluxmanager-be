import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { ClientsRepository } from "./repositories/clients.repository";
import { Client } from "./entities/client.entity";

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientsRepository) {}

  async create(createClientDto: CreateClientDto) {
    if (!createClientDto) throw new BadRequestException("Invalid data client");
    return this.repository.createClient(createClientDto);
  }

  async findAll(): Promise<Client[]> {
    return this.repository.findAllClients();
  }

  async findOne(id: string): Promise<Client> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findClientById(id);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateClientDto)
      throw new BadRequestException("Invalid data update client");

    return this.repository.updatedClient(id, updateClientDto);
  }

  async remove(id: string): Promise<Client> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteClient(id);
  }
}
