export type ChatMessage = {
  _id: string;
  clientId: string;
  timestamp: number;
  encoding?: string;
  extras?: {
    headers: Record<string, any>;
  };
  data: string;
  action: number;
  name: string;
  version: string;
  chatId: string;
  serial?: string;
  createdAt?: number;
  operation?: any;
}

export type ChatWithContact = {
    _id: string;
  participants: string[];
  lastMessage: ChatMessage;
  updatedAt: number;
  contact: {
    uuid: string;
    name: string;
    lastname: string;
    profilephoto: string;
    username: string;
  }
}

export type GetChatResponse = ChatWithContact