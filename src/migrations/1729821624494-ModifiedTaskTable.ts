import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifiedTaskTable1729821624494 implements MigrationInterface {
  name = 'ModifiedTaskTable1729821624494';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD "deadline" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "deadline"`);
  }
}
