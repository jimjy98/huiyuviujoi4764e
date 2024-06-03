import { Severity } from '@prisma/client';

export class CreateAllergyDto {
  petReactions: string;
  severity: Severity;
}
