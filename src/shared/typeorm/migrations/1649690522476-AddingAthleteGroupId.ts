import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddingAthleteGroupId1649690522476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'athletes',
      new TableColumn({
        name: 'group_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    queryRunner.clearSqlMemory();

    await queryRunner.createForeignKey(
      'athletes',
      new TableForeignKey({
        name: 'AthletesGroup',
        // chaves estrangeira referenciando a tabela athletes_group
        referencedTableName: 'athletes_group',
        // coluna referenciada da OUTRA TABELA (pode ser mais de uma)
        referencedColumnNames: ['id'],
        // coluna DESTA TABELA que faz referencia (pode ser mais de uma)
        columnNames: ['group_id'],
        // Ao deletar ou atualizar em outra tabela, reflete aqui tbm
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('athletes', 'group_id');
  }
}
