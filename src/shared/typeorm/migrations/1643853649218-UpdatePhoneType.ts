import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePhoneType1643853649218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'athletes',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'athletes',
      'phone',
      new TableColumn({
        name: 'phone',
        type: 'int',
        isUnique: true,
      }),
    );
  }
}
