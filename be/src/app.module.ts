import { Module } from '@nestjs/common';
import { PetsController } from './pets/pets.controller';
import { VaccinesController } from './vaccines/vaccines.controller';
import { AllergiesController } from './allergies/allergies.controller';
import { AllergiesService } from './allergies/allergies.service';
import { VaccinesService } from './vaccines/vaccines.service';
import { PetsService } from './pets/pets.service';

@Module({
  imports: [],
  controllers: [PetsController, VaccinesController, AllergiesController],
  providers: [PetsService, AllergiesService, VaccinesService],
})
export class AppModule {}
