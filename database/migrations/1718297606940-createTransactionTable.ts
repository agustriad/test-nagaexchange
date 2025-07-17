import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTransactions1718297606940
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.query(`
            
            CREATE TABLE IF NOT EXISTS transactions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                amount VARCHAR(100) NOT NULL DEFAULT '0',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT NULL,
                CONSTRAINT "fk_user_id_users" FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE
            );
            CREATE INDEX idx_user_id_transactions ON transactions (user_id);
            CREATE INDEX idx_created_at_transactions ON transactions (created_at);
            CREATE INDEX idx_updated_at_transactions ON transactions (updated_at);
            CREATE INDEX idx_amount_transactions ON transactions (amount);
          `);
        } catch (error) {
            console.debug(error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS transactions;`);
    }
}
