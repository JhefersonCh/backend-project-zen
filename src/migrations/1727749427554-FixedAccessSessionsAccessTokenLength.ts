import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedAccessSessionsAccessTokenLength1727749427554
  implements MigrationInterface
{
  name = 'FixedAccessSessionsAccessTokenLength1727749427554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "AccessSessions" DROP COLUMN "accessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "AccessSessions" ADD "accessToken" character varying(2000) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "AccessSessions" DROP COLUMN "accessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "AccessSessions" ADD "accessToken" character varying(255) NOT NULL`,
    );
  }
}
