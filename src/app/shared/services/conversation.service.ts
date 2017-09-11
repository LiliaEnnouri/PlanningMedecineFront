import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";
import {Conversation} from "../models/conversation";
import {UserService} from "./user.service";

@Injectable()
export class ConversationService extends GenericService {
  supportObserver: SupportObserver;

  constructor(private http: Http, private storageService: StorageService, private userService: UserService) {
    super();
  }


  getAllConversations(user: string) {
    const url = Config.baseUrl + '/conversation/admin/' + user;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => {
        const data = res.json();
        const conversations = [];
        data.forEach(function (conversation) {
          conversation.user = conversation.student ? conversation.student : conversation.teacher;
          conversations.push(conversation);
        });
        return conversations;
      })
      .catch(this.handleErrors);
  }

  getConversationById(id_conversation: number) {
    const url = Config.baseUrl + '/conversation/' + id_conversation;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getConversationMessages(id_conversation: number) {
    const url = Config.baseUrl + '/conversation/' + id_conversation + '/message';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  startConversation(id_student: number, id_admin: number, content?: string, topic?: string) {
    const url = Config.baseUrl + '/conversation/start';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      id_Student: id_student,
      id_Admin: id_admin,
      content: content,
      topic: topic
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  addConversationMessage(conversation: Conversation, content: string) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/message/add';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      id_Student: conversation.id_Student,
      id_Admin: this.userService.loggedAdmin.id_admin,
      content: content
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getConversationByStatus(user: string, status: number) {
    const url = Config.baseUrl + '/conversation/admin/' + user + '/status/' + status;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => {
        const data = res.json();
        const conversations = [];
        data.forEach(function (conversation) {
          conversation.user = conversation.student ? conversation.student : conversation.teacher;
          conversations.push(conversation);
        });
        return conversations;
      })
      .catch(this.handleErrors);
  }

  updateConversationStatus(conversation: Conversation, status: number) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/status/{status}';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {
      status: status
    }, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getConversationsCount() {
    const url = Config.baseUrl + '/conversation/admin/count';
    this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getConversationsWithStudentCount() {
    const url = Config.baseUrl + '/conversation/admin/count/student';
    this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getConversationsWithTeacherCount() {
    const url = Config.baseUrl + '/conversation/admin/count/teacher';
    this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  setConversationViewed(conversation: Conversation) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/viewed';
    this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.put(url, {}, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}


interface SupportObserver {
  switchSupportUser(user: string);
}

