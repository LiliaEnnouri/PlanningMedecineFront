import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { ResponseContentType } from '@angular/http';
import {Config} from "../config";
import {Student} from "../models/student";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
@Injectable()
export class StudentFileService extends GenericService {

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
  }


  editInformations(student: Student) {
    const url = Config.baseUrl + "/admin/student/" + student.id_student + "/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, student,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllTypes() {
    const url = Config.baseUrl + "/types";
    const headers = this.headers;
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllMentions() {
    const url = Config.baseUrl + "/mentions";
    const headers = this.headers;
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  editBacInformation(studentId: number, bac: Bac) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/bac/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, bac,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllResults() {
    const url = Config.baseUrl + "/results";
    const headers = this.headers;
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  getAllUniversities() {
    const url = Config.baseUrl + "/universities";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllLevels() {
    const url = Config.baseUrl + "/levels";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  editStudiesInformation(studentId: number, studies) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/studies/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, studies,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }


  editFonctionInformation(studentId: number, fonctions: Fonction[]) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/fonctions/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, fonctions, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  editDoctaurat(studentId: number, doctaurat: Doctaurat) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/doctaurat/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, doctaurat,

      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllSpecialities() {
    const url = Config.baseUrl + "/specialities";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllHopitaux() {
    const url = Config.baseUrl + "/hopitaux";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllServices() {
    const url = Config.baseUrl + "/services";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  editResidanatInformation(studentId: number, residanat: Residanat) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/residanat/edit";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put<any>(url, residanat, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  submitAdmin() {
    const url = Config.baseUrl + "/student/me/submitForReview";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {},
      {
        headers: headers
      }
    )
      .pipe(catchError(this.handleErrors));
  }

  getAllCredits() {
    const url = Config.baseUrl + "/credits";
    const headers = this.headers;
    return this.http.get<any>(url,
      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }


  removeDoctaurat(studentId: number) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/doctaurat/remove";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url,

      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  removeResidant(studentId: number) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/residanat/remove";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url,

      {
        headers: headers
      })
      .pipe(catchError(this.handleErrors));
  }

  getAllFonctionTypes() {
    const url = Config.baseUrl + "/fonction_types";
    const headers = this.headers;
    return this.http.get<any>(url, {
      headers: headers
    })
      .pipe(catchError(this.handleErrors));
  }

  generationAttestationFr(studentId: number, year: string, levelId: number) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-inscription/fr";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(url, {
      id_level: levelId,
      year: year
    }, options)
      .pipe(catchError(this.handleErrors));
  }

  generationAttestationAr(studentId: number, year: string, levelId: number) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-inscription/ar";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(url, {
      id_level: levelId,
      year: year
    }, options)
      .pipe(catchError(this.handleErrors));
  }

  generationAttestationPresenceFr(studentId: number, year: string, levelId: number) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-presence/fr";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(url, {
      id_level: levelId,
      year: year
    }, options)
      .pipe(catchError(this.handleErrors));
  }

  generationAttestationPresenceAr(studentId: number, year: string, levelId: number) {
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-presence/ar";
    const options = {
      headers: headers,
      responseType: 'blob' as 'json'
    };
    return this.http.post<any>(url, {
      id_level: levelId,
      year: year
    }, options)
      .pipe(catchError(this.handleErrors));
  }

  updateRegistrationStudent(registration_id_student: number, status: number) {
    const url = Config.baseUrl + "/admin/registration/university-year/" + registration_id_student + "/update";
    const headers = this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post<any>(url, {
        status: status
      },
      {
        headers: headers
      }
    )
      .pipe(catchError(this.handleErrors));
  }
}
