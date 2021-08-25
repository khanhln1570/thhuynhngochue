const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { account } = require('./seed/account.seed')
const { image } = require('./seed/image.seed')
const { member } = require('./seed/member.seed')
const { news_event } = require('./seed/news-event.seed')
const { notification } = require('./seed/notification.seed')
const { role } = require('./seed/role.seed')



async function main() {

    // create role
    await prisma.role.create({ data: { role: 'SCHOOL' } })

    // // // create account
    // await prisma.account.createMany({ data: account });

    // // // create noti
    // await prisma.notification.createMany({ data: notification });

    // // // create member
    // await prisma.member.createMany({ data: member });

    // // // create news
    // await prisma.news_event.createMany({ data: news_event });

    // // // create super image
    // await prisma.image.createMany({ data: image });


}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
})