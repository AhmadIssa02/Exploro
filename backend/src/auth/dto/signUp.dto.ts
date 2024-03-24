import { Transform } from "class-transformer";
import { IS_STRONG_PASSWORD, IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength, isStrongPassword } from "class-validator";


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @Transform(({ value }) => value?.toLowerCase().trim()) // Transform email to lowercase and trim
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}


