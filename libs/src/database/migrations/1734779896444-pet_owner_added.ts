import { MigrationInterface, QueryRunner } from "typeorm";

export class PetOwnerAdded1734779896444 implements MigrationInterface {
    name = 'PetOwnerAdded1734779896444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "owner" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "pet"
            ADD "ownerId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "pet"
            ADD CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1" FOREIGN KEY ("ownerId") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "pet" DROP CONSTRAINT "FK_20acc45f799c122ec3735a3b8b1"
        `);
        await queryRunner.query(`
            ALTER TABLE "pet" DROP COLUMN "ownerId"
        `);
        await queryRunner.query(`
            DROP TABLE "owner"
        `);
    }

}
