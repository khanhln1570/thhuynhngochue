require('dotenv').config();

module.exports.account = [{
    id: 1,
    username: 'thhuynhngochue',
    password: procees.env.SCHOOLPASSWORD,
    status: 'ACTIVE',
    accRole: 'SCHOOL'

}, {
    id: 2,
    username: 'admin',
    password: procees.env.SCHOOLPASSWORD,
    status: 'ACTIVE',
    accRole: 'SUPERADMIN'

}]