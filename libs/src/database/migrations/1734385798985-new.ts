import { MigrationInterface, QueryRunner } from "typeorm";

export class New1734385798985 implements MigrationInterface {
    name = 'New1734385798985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying(50) NOT NULL,
                "password" character varying(250) NOT NULL,
                "email" character varying(100) NOT NULL,
                "age" integer NOT NULL,
                "socialMedia" jsonb,
                "subscribed" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f4ca2c1e7c96ae6e8a7cca9df8" ON "user" ("username", "email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f4ca2c1e7c96ae6e8a7cca9df8"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
