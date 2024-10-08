import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedPhoneOnUsers1728426306134 implements MigrationInterface {
    name = 'UpdatedPhoneOnUsers1728426306134'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "phone" integer`);
    }

}
