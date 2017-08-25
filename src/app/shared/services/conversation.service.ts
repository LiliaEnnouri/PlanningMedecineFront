import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http} from "@angular/http";
import {Config} from "../config";
import {Conversation} from "../models/conversation";
import {UserService} from "./user.service";

@Injectable()
export class ConversationService extends GenericService {

  constructor(private http: Http, private storageService: StorageService, private userService: UserService) {
    super();
  }


  getAllConversations() {
    const url = Config.baseUrl + '/conversation';
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
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

  getConversationByStatus(status: number) {
    const url = Config.baseUrl + '/conversation/status/' + status;
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
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
    const url = Config.baseUrl + '/conversation/count';
    this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}

