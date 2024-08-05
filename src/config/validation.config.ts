import { plainToInstance } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator";
import { LargeNumberLike } from "crypto";

export class AppConfigValidation {
    @IsNotEmpty()
    @IsString()
    host: string;

    @IsNotEmpty()
    @IsNumber()
    port: number;
}

export class DatabaseConfigValidation {
    @IsNotEmpty()
    @IsString()
    host: string;

    @IsNotEmpty()
    @IsNumber()
    port: number;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    databse: string;

    @IsNotEmpty()
    @IsBoolean()
    synchronize: boolean;

    @IsNotEmpty()
    @IsBoolean()
    logging: boolean;
}

class ConfigValidation {
    app: AppConfigValidation;
    database: DatabaseConfigValidation;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(ConfigValidation, config, {
        enableImplicitConversion: true
    })

    console.log(validatedConfig)

    const error = validateSync(validatedConfig, {
        skipMissingProperties: false
    })

    if(error.length > 0)
        throw new Error(error.toString())

    return validatedConfig;
}