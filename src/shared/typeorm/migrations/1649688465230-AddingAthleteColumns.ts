import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddingAthleteColumns1649688465230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'athletes',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.changeColumn(
      'athletes',
      'user_type',
      new TableColumn({
        name: 'user_type',
        type: 'enum',
        enum: ['advisor', 'monitor', 'athlete'],
        default: `'athlete'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'image');
    await queryRunner.changeColumn(
      'athletes',
      'user_type',
      new TableColumn({
        name: 'user_type',
        type: 'int',
        default: 0,
      }),
    );
  }
}
