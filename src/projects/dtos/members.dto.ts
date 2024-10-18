import { ProjectRoles } from './../../shared/entities/projectRoles.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class MembersRelatedDataResponse {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: {
      projectRoles: [
        {
          id: 1,
          roleName: 'Líder',
          description: 'Es el líder del proyecto',
          createdAt: '2024-10-12T03:09:38.643Z',
          updatedAt: '2024-10-12T03:09:38.643Z',
          deletedAt: null,
        },
        {
          id: 2,
          roleName: 'Integrante',
          description: 'Es un integrante del grupo',
          createdAt: '2024-10-12T03:26:54.433Z',
          updatedAt: '2024-10-12T03:26:54.433Z',
          deletedAt: null,
        },
        {
          id: 3,
          roleName: 'Moderador',
          description: 'Es el moderador del grupo',
          createdAt: '2024-10-12T18:58:39.693Z',
          updatedAt: '2024-10-12T18:58:39.693Z',
          deletedAt: null,
        },
      ],
    },
  })
  data: { projectRoles: ProjectRoles[] };
}
