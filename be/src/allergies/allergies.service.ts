import { Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { prisma } from '../utils/prismaClient';

@Injectable()
export class AllergiesService {
  async create(petId: number, createAllergyDto: CreateAllergyDto) {
    return prisma.allergy.create({
      data: {
        petId,
        ...createAllergyDto,
      },
    });
  }
}
