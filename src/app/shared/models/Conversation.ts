import {ConversationMessage} from "./Conversation_Message";
import {Student} from "./student";
export class Conversation {
  id_Conversation: number;
  id_Student: number;
  status: number;
  topic: string;
  created_at: string;
  updated_at: string;
  messages: Array<ConversationMessage>
  latest_message: ConversationMessage;
  student: Student;
}
