import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReceipeService } from './receipe.service';
import { ReceipeDto, updateDescription } from './dto/receipe.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/public.decotor';

// @UseGuards(AuthGuard)
@Controller('receipe')
export class ReceipeController {
  constructor(private receipeService: ReceipeService) {}

  @Public()
  @Get()
  async getReceipe() {
    return this.receipeService.getReceipe();
  }

  // @UseGuards(AuthGuard)
  @Post()
  async addReceipe(@Body() receipeDto: ReceipeDto) {
    return await this.receipeService.addReceipe(receipeDto);
  }

  @Patch('/:id')
  async updateReceipe(
    @Body() { description }: updateDescription,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    console.log('description ==> ', description);
    return await this.receipeService.updateReceipe(id, description);
  }

  @Delete('/:id')
  async deleteReceipe(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.receipeService.deleteReceipe(id);
  }

  @Get('/:id')
  @Public()
  async getReceipeById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.receipeService.getReceipeById(id);
  }
}
