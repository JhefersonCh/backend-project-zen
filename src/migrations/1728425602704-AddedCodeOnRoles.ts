import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCodeOnRoles1728425602704 implements MigrationInterface {
    name = 'AddedCodeOnRoles1728425602704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" RENAME COLUMN "doce" TO "code"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" RENAME COLUMN "code" TO "doce"`);
    }

}
