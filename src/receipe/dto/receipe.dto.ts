import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, arrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, isNumber, IsString, Min, minLength, MinLength, ValidateNested } from "class-validator";

export enum Unit {
  MILILITERS = 'mililiters',
  LITERS = 'LITERS',
  GRAMS = 'grams',
  KILOGRAMS = 'kilograms',
  SPOONS = 'spoons',
  CUPS = 'cups',
  PIECES = 'pieces',
}

export class ReceipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({each: true})
  @Type(() => Ingredients)
  ingredients: Ingredients[];
}

export class Ingredients {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(Unit)
  unit: Unit;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}


export class updateDescription {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
