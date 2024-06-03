import { Body, Controller, Param, Post } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { CreateVaccineDto } from './dto/create-vaccine.dto';

@Controller('pets/:id/vaccine')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}
  @Post()
  create(
    @Param('id') petId: string,
    @Body() createVaccineDto: CreateVaccineDto,
  ) {
    return this.vaccinesService.create(parseInt(petId), createVaccineDto);
  }
}
