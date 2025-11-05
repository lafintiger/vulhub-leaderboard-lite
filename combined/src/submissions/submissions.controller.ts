import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubmissionsService } from './submissions.service';

class CreateSubmissionDto {
  @IsString()
  vulnName: string;

  @IsString()
  vulnCategory: string;

  @IsString()
  notes: string;
}

@ApiTags('submissions')
@Controller('submissions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SubmissionsController {
  constructor(private submissions: SubmissionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('screenshot'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateSubmissionDto,
  ) {
    return this.submissions.create(req.user.userId, {
      ...dto,
      screenshotUrl: file?.filename || 'no-file',
    });
  }

  @Get('mine')
  async getMine(@Request() req) {
    return this.submissions.findByUser(req.user.userId);
  }

  @Get()
  async getAll() {
    return this.submissions.findAll();
  }

  @Patch(':id/approve')
  async approve(@Param('id') id: string) {
    return this.submissions.approve(id);
  }

  @Patch(':id/reject')
  async reject(@Param('id') id: string) {
    return this.submissions.reject(id);
  }
}

