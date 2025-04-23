import { IsNotEmpty, IsString } from "class-validator";

export class CreateCarCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
