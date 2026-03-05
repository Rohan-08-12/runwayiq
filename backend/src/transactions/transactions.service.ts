import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TransactionsService {

    constructor(private readonly prisma:PrismaService){}

    async uploadTransactions(file : Express.Multer.File) {
        const content=file.buffer.toString();
        // parse content using csv-parse
        const record=parse(content,{
            columns:true,
            skip_empty_lines:true
        })

        for(const row of record){
            await this.prisma
            
        }

        return { message: 'File uploaded successfully', count: record.length };
    }
}
