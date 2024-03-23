import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class LoginDto {
    
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}


