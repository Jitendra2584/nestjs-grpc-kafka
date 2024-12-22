import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRefreshToken1734873703994 implements MigrationInterface {
    name = 'AddedRefreshToken1734873703994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "refreshToken" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "refreshToken"
        `);
    }

}
