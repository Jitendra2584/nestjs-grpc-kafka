import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePetEntity1734733583935 implements MigrationInterface {
    name = 'CreatePetEntity1734733583935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "pet" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "type" character varying(255),
                CONSTRAINT "PK_b1ac2e88e89b9480e0c5b53fa60" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "pet"
        `);
    }

}
