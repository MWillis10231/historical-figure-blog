const crypto = require('crypto')

// Generates a salt for our passwords
function generateSalt(rounds) {
    if (rounds >= 15) {
        throw new Error(`${rounds} is equal to or greater than 15, must be less than 15`);
    }
    if (typeof rounds !== 'number') {
        throw new Error('Rounds param must be a number');
    }
    if (rounds == null) {
        rounds = 12;
    }
    return crypto.randomBytes(Math.ceil(rounds / 2)).toString('hex').slice(0, rounds);
};

// Hashing algorithm, performs hashing and salting logic. Takes in password and salt, produces an object with the salt and the hashed result
function hasher(password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hashedpassword: value
    };
};

// Hash function, checks input and then calls hashing algorithm above
function hash(password, salt) {
    if (password == null || salt == null) {
        throw new Error('Must Provide Password and salt values');
    }
    if (typeof password !== 'string' || typeof salt !== 'string') {
        throw new Error('password must be a string and salt must either be a salt string or a number of rounds');
    }
    return hasher(password, salt);
};

// Compare function, checks input, and then checks that a password matches with the hash and salt
function compare (password, hash) {
    if (password == null || hash == null) {
        throw new Error('password and hash is required to compare');
    }
    if (typeof password !== 'string' || typeof hash !== 'object') {
        throw new Error('password must be a String and hash must be an Object');
    }
    let passwordData = hasher(password, hash.salt);
    if (passwordData.hashedpassword === hash.hashedpassword) {
        return true;
    }
    return false
};

module.exports = { generateSalt, hash, compare }

