/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class AdminPanelElementValidatorPipe implements PipeTransform {
  readonly allowedElements = [
    'priority',
    'status',
    'tag',
    'projectRole',
    'category',
    'identificationType',
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    const elementValue = typeof value === 'object' ? value.toString() : value;

    if (!this.allowedElements.includes(elementValue)) {
      throw new BadRequestException(`Tabla no válida: ${elementValue}`);
    }
    return elementValue;
  }
}
