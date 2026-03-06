import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TransactionsService {

    constructor(private readonly prisma: PrismaService) { }

    async uploadTransactions(file: Express.Multer.File, businessId: string, accountId: string) {
        const content = file.buffer.toString();
        // parse content using csv-parse
        const record = parse(content, {
            columns: true,
            skip_empty_lines: true
        }) as any[]

        for (const row of record) {
            const category = await this.prisma.category.findFirst({
                where: {
                    type: row.direction === 'INCOME' ? 'INCOME' : 'OPEX'
                }
            })
            const rowData = {
                date: new Date(row.date),
                amount: parseInt(row.amount),
                description: row.description,
                categoryId: category?.id ?? '',
                businessId: businessId,
                accountId: accountId,
                direction: row.direction,
                merchant_name: row.merchantName
            }

            await this.prisma.transaction.create({
                data: rowData
            })

        }

        return { message: 'File uploaded successfully', count: record.length };
    }
}
