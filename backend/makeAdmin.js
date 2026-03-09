const { User } = require('./src/models');
const dotenv = require('dotenv');
dotenv.config();

const email = process.argv[2];

if (!email) {
    console.log('Usage: node makeAdmin.js <email>');
    process.exit(1);
}

(async () => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            return;
        }
        user.role = 'admin';
        await user.save();
        console.log(`User ${email} is now an admin`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
