import {ConversationMessage} from "./conversation_message";
import {Student} from "./student";
import {Teacher} from "./Teacher";
export class Conversation {
  id_Conversation: number;
  id_Student: number;
  id_Teacher: number;
  status: number;
  topic: string;
  viewed: boolean;
  created_at: string;
  updated_at: string;
  messages: Array<ConversationMessage>;
  latest_message: ConversationMessage;
  student: Student;
  user: any;
  teacher: Teacher;
}
