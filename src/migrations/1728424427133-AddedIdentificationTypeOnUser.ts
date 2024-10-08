import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIdentificationTypeOnUser1728424427133 implements MigrationInterface {
    name = 'AddedIdentificationTypeOnUser1728424427133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "identificationTypeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_4416de500bb36e2448b70f34c4b" FOREIGN KEY ("identificationTypeId") REFERENCES "IdentificationTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_4416de500bb36e2448b70f34c4b"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "identificationTypeId"`);
    }

}
