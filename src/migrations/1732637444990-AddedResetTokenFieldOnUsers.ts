import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedResetTokenFieldOnUsers1732637444990 implements MigrationInterface {
    name = 'AddedResetTokenFieldOnUsers1732637444990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "resetToken" character varying(200)`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "resetTokenExpiry" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "resetTokenExpiry"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "resetToken"`);
    }

}
