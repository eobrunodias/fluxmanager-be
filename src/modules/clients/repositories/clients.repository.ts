import { InjectRepository } from "@nestjs/typeorm";
import { Client } from "../entities/client.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { UpdateClientDto } from "../dto/update-client.dto";
import { CreateClientDto } from "../dto/create-client.dto";

export class ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly repository: Repository<Client>,
  ) {}

  async createClient(createClientDto: CreateClientDto) {
    const existingClient = await this.repository.findOneBy({
      email: createClientDto.email,
    });
    if (existingClient) throw new NotFoundException("Email already exists");

    const client = this.repository.create(createClientDto);

    return await this.repository.save(client);
  }

  async findAllClients() {
    const clients = await this.repository.find();
    if (!clients || clients.length === 0)
      throw new NotFoundException("Clients not found");

    return clients;
  }

  async findClientById(id: string) {
    const client = await this.repository.findOneBy({ id });
    if (!client) throw new NotFoundException("Client not found");

    return client;
  }

  async updatedClient(id: string, updatedClientDto: UpdateClientDto) {
    const clientPreloaded = await this.repository.preload({
      id,
      ...updatedClientDto,
    });

    if (!clientPreloaded) throw new NotFoundException("Client not found");

    return await this.repository.save(clientPreloaded);
  }

  async deleteClient(id: string) {
    const client = await this.repository.findOneBy({ id });
    if (!client) throw new NotFoundException("Client not found");

    await this.repository.delete({ id });

    return client;
  }
}
