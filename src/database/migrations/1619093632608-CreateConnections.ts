import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619093632608 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Connections",
                columns: [
                    {
                        name: "id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable:true
                    },
                    {
                        name:"user_id",
                        type:"uuid"
                    },
                    {
                      name:"socket_id",
                      type:"varchar"
                    },
                    {
                        name: "create_at",
                        type:"timestamp",
                        default:"now()"
                    },
                    {
                        name: "update_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ]
            })
        )
        await  queryRunner.createForeignKey(
            "Connections",
            new TableForeignKey({
                name:"FKConnectionUser",
                       referencedTableName: "user",
                       referencedColumnNames:["id"],
                       columnNames: ["user_id"],
                       onDelete:"SET NULL",
                       onUpdate: "SET NULL"
            })
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("Connections", "FKConnectionUser")
        await queryRunner.dropTable("Connections")

    }

}
