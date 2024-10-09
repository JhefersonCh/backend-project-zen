import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesToProjectAndTasks1728513861901
  implements MigrationInterface
{
  name = 'CreateTablesToProjectAndTasks1728513861901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Categories" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_537b5c00afe7427c4fc9434cd59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ProjectCategories" ("id" SERIAL NOT NULL, "projectId" integer NOT NULL, "categoryId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3758febb81d2e97f97b95348827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Projects" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "finishDate" TIMESTAMP, "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b25c37f2cdf0161b4f10ed3121c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Status" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_343536a4489d5ce9d993aba7776" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Priorities" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_34064ee82392a0414072e0b8a46" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tags" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_61aa7408a426fea5dd8416f5a12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "TaskTags" ("id" SERIAL NOT NULL, "taskId" integer NOT NULL, "tagId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_6d94f7b6d1607823302d269dc37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Tasks" ("id" SERIAL NOT NULL, "title" character varying(200) NOT NULL, "description" character varying(2000) NOT NULL, "projectId" integer NOT NULL, "priorityId" integer NOT NULL, "statusId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Assignments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, "taskId" integer NOT NULL, CONSTRAINT "PK_65af8f84fc683d724d739c7f942" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ProjectRoles" ("id" SERIAL NOT NULL, "roleName" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ea71f2e73556a706a8d8c2d82b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Members" ("id" SERIAL NOT NULL, "userId" uuid NOT NULL, "projectId" integer NOT NULL, "projectRoleId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9f2f12e5e39f9c534c6e4916002" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Comments" ("id" SERIAL NOT NULL, "content" character varying(2000) NOT NULL, "userId" uuid NOT NULL, "rowTable" character varying NOT NULL, "rowId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_91e576c94d7d4f888c471fb43de" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProjectCategories" ADD CONSTRAINT "FK_10bfff96bbc0b21b97fd53bcf9f" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProjectCategories" ADD CONSTRAINT "FK_55dec0b75fa0f1d0f50efd844f7" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TaskTags" ADD CONSTRAINT "FK_409876ac29ae7dde7d091b8cfbb" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "TaskTags" ADD CONSTRAINT "FK_3a1380de4aba34140dfa3c22d8a" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_ce2eeb5146a99fc267909ac0e12" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_52192087b90e79086de1311798a" FOREIGN KEY ("priorityId") REFERENCES "Priorities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" ADD CONSTRAINT "FK_152002661c9ee06410b804b9c2a" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Assignments" ADD CONSTRAINT "FK_d6b0674a473b5820d922d138ca8" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Assignments" ADD CONSTRAINT "FK_d3063c6ba329bfe2a67eb00f20b" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" ADD CONSTRAINT "FK_db18c66219b890feba1cc44e520" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" ADD CONSTRAINT "FK_86cbc56d2fc0c0d2423aabcb5a0" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" ADD CONSTRAINT "FK_d85cd3325451fe05945d752eaf4" FOREIGN KEY ("projectRoleId") REFERENCES "ProjectRoles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Comments" ADD CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Comments" DROP CONSTRAINT "FK_aa80cd9ae4c341f0aeba2401b10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" DROP CONSTRAINT "FK_d85cd3325451fe05945d752eaf4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" DROP CONSTRAINT "FK_86cbc56d2fc0c0d2423aabcb5a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Members" DROP CONSTRAINT "FK_db18c66219b890feba1cc44e520"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Assignments" DROP CONSTRAINT "FK_d3063c6ba329bfe2a67eb00f20b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Assignments" DROP CONSTRAINT "FK_d6b0674a473b5820d922d138ca8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_152002661c9ee06410b804b9c2a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_52192087b90e79086de1311798a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Tasks" DROP CONSTRAINT "FK_ce2eeb5146a99fc267909ac0e12"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TaskTags" DROP CONSTRAINT "FK_3a1380de4aba34140dfa3c22d8a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "TaskTags" DROP CONSTRAINT "FK_409876ac29ae7dde7d091b8cfbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProjectCategories" DROP CONSTRAINT "FK_55dec0b75fa0f1d0f50efd844f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ProjectCategories" DROP CONSTRAINT "FK_10bfff96bbc0b21b97fd53bcf9f"`,
    );
    await queryRunner.query(`DROP TABLE "Comments"`);
    await queryRunner.query(`DROP TABLE "Members"`);
    await queryRunner.query(`DROP TABLE "ProjectRoles"`);
    await queryRunner.query(`DROP TABLE "Assignments"`);
    await queryRunner.query(`DROP TABLE "Tasks"`);
    await queryRunner.query(`DROP TABLE "TaskTags"`);
    await queryRunner.query(`DROP TABLE "Tags"`);
    await queryRunner.query(`DROP TABLE "Priorities"`);
    await queryRunner.query(`DROP TABLE "Status"`);
    await queryRunner.query(`DROP TABLE "Projects"`);
    await queryRunner.query(`DROP TABLE "ProjectCategories"`);
    await queryRunner.query(`DROP TABLE "Categories"`);
  }
}
