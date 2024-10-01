import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1727717998770 implements MigrationInterface {
  name = 'CreateUserTable1727717998770';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Users" ("id" uuid NOT NULL, "identification" character varying(100) NOT NULL, "fullName" character varying(255) NOT NULL, "avatarUrl" character varying(255), "username" character varying(255), "phone" integer, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Users"`);
  }
}
