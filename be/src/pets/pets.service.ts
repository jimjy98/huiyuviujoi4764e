import { Injectable } from '@nestjs/common';
import { prisma } from '../utils/prismaClient';
import { CreatePetDto } from './dto/create-pet.dto';

@Injectable()
export class PetsService {
  async findAll() {
    return prisma.pet.findMany();
  }

  async findUnique(id: number) {
    return prisma.pet.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        allergies: true,
        vaccines: true,
      },
    });
  }

  async create(pet: CreatePetDto) {
    return prisma.pet.create({
      data: {
        ...pet,
      },
    });
  }

  async findPetsByOwnerName(ownerName: string) {
    return prisma.pet.findMany({
      where: {
        ownerName,
      },
    });
  }

  async deletePet(id: number) {
    return prisma.pet.delete({
      where: { id },
    });
  }
}
