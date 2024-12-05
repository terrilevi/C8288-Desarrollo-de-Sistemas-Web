// tests/integration/socket.test.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { io as Client } from 'socket.io-client';
import { createServer } from 'http';
import PostMessage from '../../models/postMessage.js';
import User from '../../models/user.js';

describe('Social Media Feature Integration Tests', () => {
    let mongoServer;
    let io;
    let httpServer;
    let port;
    let userJohn;
    let userJane;
    let johnSocket;
    let janeSocket;

    beforeAll(async () => {
        // setupeamos el bd del test
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());

        // setupeamos el server
        httpServer = createServer();
        io = new Server(httpServer);
        
        // empezamos en un random port
        await new Promise(resolve => {
            httpServer.listen(0, resolve);
        });
        port = httpServer.address().port;

        // creamos usuario test
        userJohn = await User.create({
            email: 'john@test.com',
            name: 'John',
            password: 'password123'
        });

        userJane = await User.create({
            email: 'jane@test.com',
            name: 'Jane',
            password: 'password123'
        });
    });

    beforeEach(async () => {
        // creamos fresh socket conexiones
        johnSocket = Client(`http://localhost:${port}`);
        janeSocket = Client(`http://localhost:${port}`);
        
        await Promise.all([
            new Promise(resolve => johnSocket.on('connect', resolve)),
            new Promise(resolve => janeSocket.on('connect', resolve))
        ]);

        // setupeamos socket handlers
        io.on('connection', (socket) => {
            socket.on('authenticate', (userId) => {
                socket.join(`user:${userId}`);
            });
        });
    });

    afterEach(async () => {
        // limpiamos despues de cada test
        await PostMessage.deleteMany({});
        [johnSocket, janeSocket].forEach(socket => {
            if (socket?.connected) socket.disconnect();
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        await new Promise(resolve => httpServer.close(resolve));
    });

    test('complete post and reaction flow', async () => {
        // 1. creamos el post inicial
        const post = await PostMessage.create({
            message: 'Hello world',
            creator: userJohn._id,
            name: userJohn.name,
            likes: [],
            hahaReactions: []
        });

        // 2. trackeamos updates que realizan los usuarios
        const updates = {
            john: [],
            jane: []
        };
        
        johnSocket.on('postUpdate', update => updates.john.push(update));
        janeSocket.on('postUpdate', update => updates.jane.push(update));

        // 3. jane da like a un post
        await PostMessage.findByIdAndUpdate(
            post._id,
            { $push: { likes: userJane._id } }
        );

        // Emit update
        const likedPost = await PostMessage.findById(post._id);
        io.emit('postUpdate', likedPost.toJSON());

        // 4. john añade un haha reaction
        await PostMessage.findByIdAndUpdate(
            post._id,
            { $push: { hahaReactions: userJohn._id } }
        );

        // Emit update
        const finalPost = await PostMessage.findById(post._id);
        io.emit('postUpdate', finalPost.toJSON());

        // se espera por updates
        await new Promise(resolve => setTimeout(resolve, 100));

        // 5. verificamos actualizaciones en tiempo real
        expect(updates.john.length).toBe(2);
        expect(updates.jane.length).toBe(2);

        // 6. verificamos el estado de la bd
        const dbPost = await PostMessage.findById(post._id);
        expect(dbPost.likes.map(id => id.toString()))
            .toContain(userJane._id.toString());
        expect(dbPost.hahaReactions.map(id => id.toString()))
            .toContain(userJohn._id.toString());
    });

    test('friend request notification flow', async () => {
        // 1. Setup
        janeSocket.emit('authenticate', userJane._id.toString());
        let receivedRequest = null;

        // 2. escuchamos el request del amigo usuario
        janeSocket.on('friendRequestUpdate', request => {
            receivedRequest = request;
        });

        // 3. enviamos la oslicitud de amistad
        await User.findByIdAndUpdate(userJane._id, {
            $push: {
                friendRequests: {
                    from: userJohn._id,
                    createdAt: new Date()
                }
            }
        });

        // 4. Emit notificacion
        io.to(`user:${userJane._id}`).emit('friendRequestUpdate', {
            from: {
                _id: userJohn._id.toString(),
                name: userJohn.name
            }
        });

        // esperemos notificacion
        await new Promise(resolve => setTimeout(resolve, 100));

        // 5. Verficamos
        expect(receivedRequest).toBeTruthy();
        expect(receivedRequest.from._id).toBe(userJohn._id.toString());

        const jane = await User.findById(userJane._id);
        expect(jane.friendRequests[0].from.toString())
            .toBe(userJohn._id.toString());
    });
});