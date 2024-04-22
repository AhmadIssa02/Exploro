import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { verifyEmailDto } from './dto/verify.dto';
import { UsersService } from '../users/users.service';
import { MailService } from 'src/mail/mail.service';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    private maileService: MailService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, profilePicture } = signUpDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      profilePicture,
    });

    const token = this.jwtService.sign({ id: user._id });
    //create a verification token
    // Generate a verification token
    const verificationToken = await this.jwtService.signAsync(
      { sub: user._id.toString() },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h',
      },
    );

    // Hash the verification token
    const hashedToken = await bcrypt.hash(verificationToken, 10);

    // Save the hashed token in the database
    await this.usersService.update(user._id.toString(), {
      verifyEmailToken: hashedToken,
    });

    //send verification email
    await this.maileService.sendEmail(user, verificationToken);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async verifyEmail(verifyEmailDto: verifyEmailDto): Promise<boolean> {
    const decoded = jwt.decode(verifyEmailDto.token) as { id: string }; // Ensure this matches the actual token structure
    const userId = decoded.id;

    const user = await this.usersService.findOne(userId);
    if (!user) throw new UnauthorizedException(UnauthorizedException);
    //compare the token with the one in the database
    const tokenMatches = await isHashMatched(
      verifyEmailDto.verifyEmailToken,
      user.verifyEmailToken,
    );
    if (!tokenMatches) throw new UnauthorizedException(UnauthorizedException);

    // Update the user to be verified
    await this.usersService.update(user._id.toString(), {
      isVerified: true,
      verifyEmailToken: null,
    });
    return true;
  }
}

export const isHashMatched = async (
  data: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(data, hash);
};
