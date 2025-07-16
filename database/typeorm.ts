import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigSource } from "./dataSource.database";

dotenvConfig({ path: ".env" });

const config = ConfigSource;

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
