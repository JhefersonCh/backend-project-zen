import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRoleOnUser1728424768373 implements MigrationInterface {
    name = 'AddedRoleOnUser1728424768373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Roles" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_65c56db5a9988b90b0d7245e0f0" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_65c56db5a9988b90b0d7245e0f0"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP TABLE "Roles"`);
    }

}
