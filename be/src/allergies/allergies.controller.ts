import { Body, Controller, Param, Post } from '@nestjs/common';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';

@Controller('pets/:id/allergy')
export class AllergiesController {
  constructor(private readonly allergiesService: AllergiesService) {}

  @Post()
  create(
    @Param('id') petId: string,
    @Body() createAllergyDto: CreateAllergyDto,
  ) {
    return this.allergiesService.create(parseInt(petId), createAllergyDto);
  }
}
