import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangingIsOptionalToTypeOnPlanningCreate1654655634376 implements MigrationInterface {
  name = 'ChangingIsOptionalToTypeOnPlanningCreate1654655634376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "training" RENAME COLUMN "is_optional" TO "type"`);
    await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    await queryRunner.query(
      `ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT 'now()'`,
    );
    await queryRunner.query(
      `ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`,
    );
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "training" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    await queryRunner.query(`ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 15:01:32.260069'`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 15:01:32.260069'`,
    );
    await queryRunner.query(`ALTER TABLE "training" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "training" ADD "type" boolean NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 15:01:32.260069'`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 15:01:32.260069'`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 15:01:32.260069'`,
    );
    await queryRunner.query(`ALTER TABLE "training" RENAME COLUMN "type" TO "is_optional"`);
  }
}
