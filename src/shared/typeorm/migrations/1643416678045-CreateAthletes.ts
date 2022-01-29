import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAthletes1643416678045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'athletes',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'user_type',
              type: 'int',
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'phone',
              type: 'int',
              isUnique: true,
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'birthdate',
              type: 'varchar',
            },
            {
              name: 'gender',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('athletes');
    }
}
