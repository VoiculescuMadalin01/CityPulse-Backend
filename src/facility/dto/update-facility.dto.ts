import { PartialType } from '@nestjs/swagger'
import { FacilityDto } from '../entities/facility.entity'

export class UpdateFacilityDto extends PartialType(FacilityDto) {}
