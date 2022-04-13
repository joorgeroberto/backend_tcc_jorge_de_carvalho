import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddingAdvisorNameAndIdOnAthletesGroupTable1649813795295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('athletes_group', [
      new TableColumn({
        name: 'advisor_id',
        type: 'uuid',
        isNullable: true,
      }),
      new TableColumn({
        name: 'advisor_name',
        type: 'varchar',
        isNullable: true,
      }),
    ]);

    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      'athletes_group',
      new TableForeignKey({
        name: 'advisor_id',
        // chaves estrangeira referenciando a tabela athletes_group
        referencedTableName: 'athletes',
        // coluna referenciada da OUTRA TABELA (pode ser mais de uma)
        referencedColumnNames: ['id'],
        // coluna DESTA TABELA que faz referencia (pode ser mais de uma)
        columnNames: ['advisor_id'],
        // Ao atualizar em outra tabela, reflete aqui tbm
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('athletes_group', ['advisor_id', 'advisor_name']);
  }
}
