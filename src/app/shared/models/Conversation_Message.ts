import {Conversation} from "./Conversation";
import {Admin} from "./Admin";
import {Student} from "./student";
export class ConversationMessage {
  id_Conversation_Message: number;
  id_Conversation: number;
  id_Admin: number;
  id_Student: number;
  content: string;
  created_at: string;
  updated_at: string;
  conversation: Conversation;

  student: Student;
  admin: Admin;
}
