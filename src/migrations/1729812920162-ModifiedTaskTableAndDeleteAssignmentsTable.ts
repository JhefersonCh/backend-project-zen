import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifiedTaskTableAndDeleteAssignmentsTable1729812920162
  implements MigrationInterface
{
  name = 'ModifiedTaskTableAndDeleteAssignmentsTable1729812920162';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD "memberId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_8a03caee0b5eaa9d81b37e78d1f" FOREIGN KEY ("memberId") REFERENCES "Members"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_8a03caee0b5eaa9d81b37e78d1f"`,
    );
    await queryRunner.query(`ALTER TABLE "Tasks" DROP COLUMN "memberId"`);
  }
}
