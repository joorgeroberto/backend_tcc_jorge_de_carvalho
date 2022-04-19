import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingNullableGroupId1650380458134 implements MigrationInterface {
  name = 'AddingNullableGroupId1650380458134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    await queryRunner.query(
      `ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT 'now()'`,
    );
    await queryRunner.query(
      `ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`,
    );
    await queryRunner.query(`ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    await queryRunner.query(`ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "group_id" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "athletes" ALTER COLUMN "group_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "planning" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 01:11:08.042657'`,
    );
    await queryRunner.query(
      `ALTER TABLE "training" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 01:11:08.042657'`,
    );
    await queryRunner.query(
      `ALTER TABLE "performed_training" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 01:11:08.042657'`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise_group" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 01:11:08.042657'`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercise" ALTER COLUMN "created_at" SET DEFAULT '2022-04-19 01:11:08.042657'`,
    );
  }
}
