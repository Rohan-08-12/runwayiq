import { Controller, Post, UploadedFile, UseInterceptors, Query, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

    constructor(private readonly transactionsService: TransactionsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadTransactions(
        @UploadedFile() file: Express.Multer.File,
        @Query('businessId') businessId: string,
        @Query('accountId') accountId: string
    ) {
        return this.transactionsService.uploadTransactions(file, businessId, accountId);
    }

    @Get('all')
    getAllTransactions(@Query('businessId') businessId: string) {
        return this.transactionsService.getTransactions(businessId);
    }

}
