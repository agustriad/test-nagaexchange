import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1718297606939 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
            
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                name VARCHAR(50) DEFAULT NULL,
                email VARCHAR(50) DEFAULT NULL,
                password TEXT DEFAULT NULL,
                token TEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                CONSTRAINT unique_email_user UNIQUE (email)

            );
          `);
        } catch (error) {
            console.debug(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    }
}
