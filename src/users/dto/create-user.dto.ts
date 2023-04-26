import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Hasło musi mieć minimum 8 znaków' })
  @Matches(/[\W]/, {
    message: 'Hasło musi zawierać przynajmniej jeden znak specjalny',
  })
  password: string;
}
