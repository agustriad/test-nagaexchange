import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

const allowedEngines = [
    'postgres',
    'mysql',
    'mariadb',
    'sqlite',
    'mssql',
] as const;
type SupportedDbEngines = (typeof allowedEngines)[number];

const getDatabaseType = (): SupportedDbEngines => {
    const engine = process.env.DATABASE_ENGINE || 'postgres';
    if (allowedEngines.includes(engine as SupportedDbEngines)) {
        return engine as SupportedDbEngines;
    }
    throw new Error(`Database engine '${engine}' is not supported.`);
};

export const ConfigSource = {
    type: getDatabaseType(),
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

    migrationsTableName: 'migrations',
    cache: {
        duration: 600000,
        type: 'database',
    },
    cli: {
        migrationsDir: 'database/migrations',
    },
    autoLoadEntities: true,
    synchronize: true,
};

export function DataSource(): any {
    return TypeOrmModule.forRoot({
        type: getDatabaseType(),
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*.ts'],
        migrationsTableName: 'migrations',
        autoLoadEntities: true,
        synchronize: false,
        cache: {
            duration: 600000,
            type: 'database',
        },
    });
}
