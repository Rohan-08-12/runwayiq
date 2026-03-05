import { Controller, Post, UploadedFile , UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {

    constructor(private readonly transactionsService : TransactionsService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadTransactions(@UploadedFile() file: Express.Multer.File) {
        return this.transactionsService.uploadTransactions(file);
    }
    
}
