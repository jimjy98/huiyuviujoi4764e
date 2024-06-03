import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Pet } from '@prisma/client';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}
  @Get()
  async findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Get('by-owner')
  async findPetsByOwnerName(
    @Query('ownerName') ownerName: string,
  ): Promise<Pet[]> {
    return this.petsService.findPetsByOwnerName(ownerName);
  }

  @Get(':id')
  async findUnique(@Param('id') id: string): Promise<Pet> {
    try {
      return this.petsService.findUnique(parseInt(id));
    } catch (e) {
      throw new HttpException('Pet ID does not exist', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    try {
      await this.petsService.create(createPetDto);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.petsService.deletePet(parseInt(id));
    } catch (e) {
      throw new HttpException('Pet ID does not exist', HttpStatus.NOT_FOUND);
    }
  }
}
