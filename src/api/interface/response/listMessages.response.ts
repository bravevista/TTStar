import { ChatMessage } from "./getChat.reponse";

export type ListMessagesResponse = {
    data: ChatMessage[];
    nextCursor?: string;
}