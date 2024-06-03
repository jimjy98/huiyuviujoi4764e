import { Injectable } from '@nestjs/common';
import { prisma } from '../utils/prismaClient';
import { CreateVaccineDto } from './dto/create-vaccine.dto';

@Injectable()
export class VaccinesService {
  async create(petId: number, createVaccineDto: CreateVaccineDto) {
    return prisma.vaccine.create({
      data: {
        petId,
        ...createVaccineDto,
      },
    });
  }
}
