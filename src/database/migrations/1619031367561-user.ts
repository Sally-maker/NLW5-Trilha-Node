import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1619004521630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "Id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}