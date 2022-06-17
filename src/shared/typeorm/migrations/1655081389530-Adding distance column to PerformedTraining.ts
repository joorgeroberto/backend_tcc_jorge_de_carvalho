import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingDistanceColumnToPerformedTraining1655081389530 implements MigrationInterface {
    name = 'AddingDistanceColumnToPerformedTraining1655081389530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "performed_training" ADD "distance" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT '2022-06-08 02:34:24.904271'`);
        await queryRunner.query(`ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT '2022-06-08 02:34:24.904271'`);
        await queryRunner.query(`ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT '2022-06-08 02:34:24.904271'`);
        await queryRunner.query(`ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT '2022-06-08 02:34:24.904271'`);
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT '2022-06-08 02:34:24.904271'`);
        await queryRunner.query(`ALTER TABLE "performed_training" DROP COLUMN "distance"`);
    }

}
