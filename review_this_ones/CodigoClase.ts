//npm install -g typescript
// tsc -p tsconfig.json
let messageText: string = "mi primer mensaje de chat";
let messageText2: string = "hi terri";
let numberSample: number = 66;

// estoy definiendo dos arreglos que tienen numeros
// pero por que tienen dos diferentes sintaxis??
// estamos definiendo arreglos que tienen numero
// averiguar luego porque es que aqui los define como const
const numbers: Array<number> = [1, 2]; 
const bigNumbers: number[] = [300, 400];


interface Chat {
    name: string;
    model: string; 
    version: number;
} // define la estructura de un objeto chat.


// esto es un claro ejemplo de deestructuracion: 
// tan solo estamos creando mis objetos.
// pero estudiarlo mejor despues...

const foodChat: Chat = {name: 'exploración de recetas de comida', model: 'gpt-4', version : 3};
const typescriptChat: Chat = {name: 'profesor de typescript', model: 'gpt-3.5-turbo', version : 5};
// quiero practicar esto bien bien bien bieeeeeeeeeeeeeeeeeeeeeeen.


// llama a esta funcion como el objeto Chat mayuscula, mostrara algo:
function displayChat(chat: Chat) {
    console.log(`Chat: ${chat.name}, Model: ${chat.model}`);
}
displayChat(foodChat)
/* Autor Mykyta Chernenko

interface IChat {
    id: number;
    ownerId: number;
    messages: IMessage[];
}

interface IMessage {
    id: number;
    chatId: number;
    userId: number;
    content: string;
    feedback?: string;
    createdAt: Date;
}

interface IUser {
    id: number;
    name: string;
    email: string;
}

interface IDatabaseResource<T> {
    get(id: number): Promise<T | null>;

    getAll(): Promise<T[]>;
}

class ChatResource implements IDatabaseResource<IChat> {
    async get(id: number): Promise<IChat | null> {
        return null;
    }

    async getAll(): Promise<IChat[]> {
        return [];
    }
}

class UserResource implements IDatabaseResource<IUser> {
    async get(id: number): Promise<IUser | null> {
        return null;
    }

    async getAll(): Promise<IUser[]> {
        return [];
    }

    async getIdFromToken(id: string): Promise<number | null> {
        return 0;
    }
}


class AuthenticationService {
    async isAuthenticated(token: string): Promise<boolean> {
        return true;
    }
}

class ChatService {
    private chatResource: ChatResource = new ChatResource();
    private userResource: UserResource = new UserResource();
    private authService: AuthenticationService = new AuthenticationService();

    async getChatMessages(chatId: number, token: string): Promise<IMessage[] | null> {
        if (!await this.authService.isAuthenticated(token)) {
            throw new Error('Usuario no autenticado');
        }

        const userId = await this.userResource.getIdFromToken(token);
        const user = await this.userResource.get(userId!);
        const chat = await this.chatResource.get(chatId);

        if (!chat || chat.ownerId !== user?.id) {
            throw new Error('Chat no encontrado o acceso denegado');
        }

        return chat.messages;
    }
}


async function getChatMessages(chatId: number, token: string) {
    try {
        const messages = await chatService.getChatMessages(chatId, token);
        return {success: true, messages};
    } catch (error) {
        return {success: false, message: 'Error interno del servidor'};
    }
}

function narrowToNumber(value: unknown): number { 
    if (typeof value !== 'number') { 
        throw new Error('Value no es un numero'); 
    } 
    return value; 
} 


async function getChatMessagesWithNarrowing(chatId: unknown, req: { authorization: string }) { 
    const authToken = req.authorization; 
    const numberChatId = narrowToNumber(chatId); 
    const messages = await chatService.getChatMessages(numberChatId, authToken); 
    if (messages !== null) { 
        messages.map((message) => { 
            console.log(Message ID: ${message.id}, Feedback: ${message.feedback?.trim() ?? "no feedback"}); 
        }); 
        return {success: true, messages} 
    } else { 
        return {success: false, message: 'Chat no encontrado o acceso denegado'} 
    } 
} 
function getChatMessage(): IMessage | null {
    return null
}

const message = getChatMessage()
if (message !== null) {
    console.log(message.chatId)
}

console.log(`Message ID: ${message?.id}, Feedback: ${message?.feedback?.trim() ?? "no feedback"}`); 


type NarrowFunction = (value: any) => number;


type MapCallback = (message: IMessage) => void;
const logMessage: MapCallback = (message) => {
    console.log(`Message ID: ${message.id}`);
};
// messages.map((message: IMessage) => {
//     logMessage(message);
// });

*/