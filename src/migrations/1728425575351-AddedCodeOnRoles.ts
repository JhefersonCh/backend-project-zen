import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCodeOnRoles1728425575351 implements MigrationInterface {
    name = 'AddedCodeOnRoles1728425575351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" ADD "doce" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Roles" DROP COLUMN "doce"`);
    }

}
