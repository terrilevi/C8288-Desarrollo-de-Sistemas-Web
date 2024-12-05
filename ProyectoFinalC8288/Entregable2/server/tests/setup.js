// server/tests/setup.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const setupTestDB = () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    afterEach(async () => {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    });
};

const createTestUser = async (User, overrides = {}) => {
    const defaultUser = {
        email: 'test@test.com',
        password: 'test123',
        name: 'Test User',
        ...overrides
    };

    const user = new User(defaultUser);
    await user.save();
    return user;
};

const createTestPost = async (PostMessage, creator, overrides = {}) => {
    const defaultPost = {
        message: 'Test post',
        creator: creator._id,
        name: creator.name,
        ...overrides
    };

    const post = new PostMessage(defaultPost);
    await post.save();
    return post;
};

module.exports = {
    setupTestDB,
    createTestUser,
    createTestPost
};