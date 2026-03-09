const { User } = require('./src/models');
const dotenv = require('dotenv');
dotenv.config();

const verifyUser = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        user.isVerified = true;
        await user.save();
        console.log(`User ${email} verified successfully!`);
        process.exit(0);
    } catch (err) {
        console.error('Error verifying user:', err);
        process.exit(1);
    }
};

const email = process.argv[2];
if (!email) {
    console.log('Please provide an email address');
    process.exit(1);
}

verifyUser(email);
