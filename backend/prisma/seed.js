import bcrypt from "bcryptjs";
import prisma from "./prisma.client.js";
import {logger} from "../src/shared/logger/logger.js";

async function main() {
    logger.info("Seeding database...");

    // Users
    const passwordHash = await bcrypt.hash("Password1", 10);

    const admin = await prisma.user.upsert({
        where: { email: "admin@library.com" },
        update: {},
        create: {
            name: "Admin User",
            email: "admin@library.com",
            password: passwordHash,
            role: "ADMIN",
            memberShipStatus: "ACTIVE",
        },
    });

    const librarian = await prisma.user.upsert({
        where: { email: "librarian@library.com" },
        update: {},
        create: {
            name: "Librarian User",
            email: "librarian@library.com",
            password: passwordHash,
            role: "LIBRARIAN",
            memberShipStatus: "ACTIVE",
        },
    });

    const member = await prisma.user.upsert({
        where: { email: "member@library.com" },
        update: {},
        create: {
            name: "Member User",
            email: "member@library.com",
            password: passwordHash,
            role: "MEMBER",
            memberShipStatus: "ACTIVE",
        },
    });

    logger.info("Users:", {
        admin: admin.email,
        librarian: librarian.email,
        member: member.email,
    });

    // Authors
    let murakami = await prisma.author.findFirst({
        where: { name: "Haruki Murakami" },
    });
    if (!murakami) {
        murakami = await prisma.author.create({
            data: {
                name: "Haruki Murakami",
                bio: "Japanese writer known for surrealist novels like Norwegian Wood and Kafka on the Shore.",
            },
        });
    }

    let orwell = await prisma.author.findFirst({
        where: { name: "George Orwell" },
    });
    if (!orwell) {
        orwell = await prisma.author.create({
            data: {
                name: "George Orwell",
                bio: "English novelist and essayist, author of 1984 and Animal Farm.",
            },
        });
    }

    let tolkien = await prisma.author.findFirst({
        where: { name: "J.R.R. Tolkien" },
    });
    if (!tolkien) {
        tolkien = await prisma.author.create({
            data: {
                name: "J.R.R. Tolkien",
                bio: "English author and philologist, best known for The Lord of the Rings.",
            },
        });
    }

    logger.info("Authors:");

    // Books
    const norwegianWood = await prisma.book.findFirst({
        where: { isbn: "9780375704024" },
    });
    if (!norwegianWood) {
        await prisma.book.create({
            data: {
                title: "Norwegian Wood",
                genre: "ROMANCE",
                publishDate: new Date("1987-08-04"),
                isbn: "9780375704024",
                stock: 10,
                authors: {
                    create: [{ author: { connect: { id: murakami.id } } }],
                },
            },
        });
    }

    const nineteenEightyFour = await prisma.book.findFirst({
        where: { isbn: "9780451524935" },
    });
    if (!nineteenEightyFour) {
        await prisma.book.create({
            data: {
                title: "1984",
                genre: "SCIENCE_FICTION",
                publishDate: new Date("1949-06-08"),
                isbn: "9780451524935",
                stock: 15,
                authors: {
                    create: [{ author: { connect: { id: orwell.id } } }],
                },
            },
        });
    }

    const lotr = await prisma.book.findFirst({
        where: { isbn: "9780544003415" },
    });
    if (!lotr) {
        await prisma.book.create({
            data: {
                title: "The Lord of the Rings",
                genre: "FANTASY",
                publishDate: new Date("1954-07-29"),
                isbn: "9780544003415",
                stock: 8,
                authors: {
                    create: [{ author: { connect: { id: tolkien.id } } }],
                },
            },
        });
    }

    logger.info("Books seeded");
    logger.info("Seeding complete!");
}

main()
    .catch((e) => {
        logger.error({e}, "Seeding failed:");
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

