import { MigrationInterface, QueryRunner } from "typeorm";

export class create_financial_assets1658372260612 implements MigrationInterface {
    name = 'create_financial_assets1658372260612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "financial_assets" ("id" SERIAL NOT NULL, "ativo" character varying NOT NULL, "valor" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "UQ_795c4726d697f2de02932d677d2" UNIQUE ("ativo"), CONSTRAINT "PK_89c7cd61eb5b0d86dc411ac0ee4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "financial_assets"`);
    }

}