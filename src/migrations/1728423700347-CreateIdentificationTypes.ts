import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIdentificationTypes1728423700347
  implements MigrationInterface
{
  name = 'CreateIdentificationTypes1728423700347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "IdentificationTypes" ("id" SERIAL NOT NULL, "type" character varying(50) NOT NULL, "code" character varying(4) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c8ba17123ecce2479925da42740" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "IdentificationTypes"`);
  }
}
