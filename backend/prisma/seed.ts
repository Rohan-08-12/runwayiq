import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, CategoryType } from '../generated/prisma/index.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.category.create({
        data: {
            name: "Sales Revenue",
            type: CategoryType.INCOME
        }
    })

    await prisma.category.create({
        data: {
            name: "Interest",
            type: CategoryType.INCOME
        }
    })

    await prisma.category.create({
        data: {
            name: "Lease Revenue",
            type: CategoryType.INCOME

        }
    })

    await prisma.category.create({
        data: {
            name: "Raw Materials",
            type: CategoryType.COGS

        }
    })

    await prisma.category.create({
        data: {
            name: "Tools",
            type: CategoryType.COGS
        }
    })

    await prisma.category.create({
        data: {
            name: "Payroll",
            type: CategoryType.OPEX
        }
    })

    await prisma.category.create({
        data: {
            name: "Rent",
            type: CategoryType.OPEX
        }
    })

    await prisma.category.create({
        data: {
            name: "Marketing",
            type: CategoryType.OPEX
        }
    })

    await prisma.category.create({
        data: {
            name: "Software",
            type: CategoryType.OPEX
        }
    })

    await prisma.category.create({
        data: {
            name: "Shipping",
            type: CategoryType.OPEX
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
