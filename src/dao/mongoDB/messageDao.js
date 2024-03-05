import { messageModel } from "../models/message.model.js"

class MessageDAO {
    async findAll(limit) {
        return await messageModel.find().limit(limit);
    }

    async create(messageData) {
        return await messageModel.create(messageData);
    }
}

export const mongoMessageManager = new MessageDAO();