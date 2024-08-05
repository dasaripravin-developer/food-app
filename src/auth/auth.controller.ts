import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Public } from './public.decotor';

@Controller('auth')
export class AuthControler {
    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    async signIn(@Body() signInData: Login): Promise<any> {
        return await this.authService.signIn(signInData.email, signInData.password)
    }
}
