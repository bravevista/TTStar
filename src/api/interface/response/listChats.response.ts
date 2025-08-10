import { ChatWithContact } from "./getChat.reponse";

export type ListChatsResponse = {
    data: ChatWithContact[];
    nextCursor?: string;
}