import {StorageService} from "app/shared/services/storage.service";
import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {Conversation} from "../models/conversation";
import {UserService} from "./user.service";

@Injectable()
export class ConversationService extends GenericService {
  supportObserver: SupportObserver;

  constructor(private http: HttpClient, private storageService: StorageService, private userService: UserService) {
    super();
  }


  getAllConversations(user: string) {
    const url = Config.baseUrl + '/conversation/admin/' + user;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    }).pipe(map(res => {
      const data = res;
      const conversations = [];
      data.forEach(function (conversation) {
        conversation.user = conversation.student ? conversation.student : conversation.teacher;
        conversations.push(conversation);
      });
      return conversations;
    }), catchError(this.handleErrors));
  }

  getConversationById(id_conversation: number) {
    const url = Config.baseUrl + '/conversation/' + id_conversation;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getConversationMessages(id_conversation: number) {
    const url = Config.baseUrl + '/conversation/' + id_conversation + '/message';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  startConversation(id_student: number, id_admin: number, content?: string, topic?: string) {
    const url = Config.baseUrl + '/conversation/start';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
      id_Student: id_student,
      id_Admin: id_admin,
      content: content,
      topic: topic
    }, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  addConversationMessage(conversation: Conversation, content: string) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/message/add';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    let requestObj: any;
    if (conversation.id_Student) {
      requestObj = {
        id_Student: conversation.id_Student,
        id_Admin: this.userService.loggedAdmin.id_admin,
        content: content
      };
    } else if (conversation.id_Teacher) {
      requestObj = {
        id_Teacher: conversation.id_Teacher,
        id_Admin: this.userService.loggedAdmin.id_admin,
        content: content
      };
    }
    return this.http.post<any>(url, requestObj, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getConversationByStatus(user: string, status: number) {
    const url = Config.baseUrl + '/conversation/admin/' + user + '/status/' + status;
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.get<any>(url, {
      headers: headers
    }).pipe(map(res => {
        const data = res.json();
        const conversations = [];
        data.forEach(function (conversation) {
          conversation.user = conversation.student ? conversation.student : conversation.teacher;
          conversations.push(conversation);
        });
        return conversations;
      }), catchError(this.handleErrors));
  }

  updateConversationStatus(conversation: Conversation, status: number) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/status/{status}';
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
      status: status
    }, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getConversationsCount() {
    const url = Config.baseUrl + '/conversation/admin/count';
    const headers = this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getConversationsWithStudentCount() {
    const url = Config.baseUrl + '/conversation/admin/count/student';
    const headers = this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getConversationsWithTeacherCount() {
    const url = Config.baseUrl + '/conversation/admin/count/teacher';
    const headers = this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  setConversationViewed(conversation: Conversation) {
    const url = Config.baseUrl + '/conversation/' + conversation.id_Conversation + '/viewed';
    const headers = this.headers.set("Authorization", "Bearer " + this.userService.getTokent());
    return this.http.put<any>(url, {}, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }
}


interface SupportObserver {
  switchSupportUser(user: string);
}

