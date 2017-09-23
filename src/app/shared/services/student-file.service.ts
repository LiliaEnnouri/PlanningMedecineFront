import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {Http, ResponseContentType} from "@angular/http";
import {Config} from "../config";
import {Student} from "../models/student";
import {StorageService} from "./storage.service";
import {Bac} from "app/shared/models/bac";
import {Fonction} from "../models/fonction";
import {Doctaurat} from "../models/doctaurat";
import {Residanat} from "../models/residanat";
@Injectable()
export class StudentFileService extends GenericService {

  constructor(private http: Http, private storageService: StorageService) {
    super();
  }


  editInformations(student: Student) {
    const url = Config.baseUrl + "/admin/student/" + student.id_student + "/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, student,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllTypes() {
    const url = Config.baseUrl + "/types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllMentions() {
    const url = Config.baseUrl + "/mentions";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editBacInformation(studentId: number, bac: Bac) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/bac/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, bac,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllResults() {
    const url = Config.baseUrl + "/results";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllUniversities() {
    const url = Config.baseUrl + "/universities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllLevels() {
    const url = Config.baseUrl + "/levels";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editStudiesInformation(studentId: number, studies) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/studies/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, studies,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  editFonctionInformation(studentId: number, fonctions: Fonction[]) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/fonctions/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, fonctions, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editDoctaurat(studentId: number, doctaurat: Doctaurat) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/doctaurat/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, doctaurat,

      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllSpecialities() {
    const url = Config.baseUrl + "/specialities";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllHopitaux() {
    const url = Config.baseUrl + "/hopitaux";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllServices() {
    const url = Config.baseUrl + "/services";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  editResidanatInformation(studentId: number, residanat: Residanat) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/residanat/edit";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.put(url, residanat, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  submitAdmin() {
    const url = Config.baseUrl + "/student/me/submitForReview";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.post(url, {},
      {
        headers: this.headers
      }
    )
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllCredits() {
    const url = Config.baseUrl + "/credits";

    return this.http.get(url,
      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }


  removeDoctaurat(studentId: number) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/doctaurat/remove";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url,

      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  removeResidant(studentId: number) {
    const url = Config.baseUrl + "/admin/student/" + studentId + "/residanat/remove";
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    return this.http.delete(url,

      {
        headers: this.headers
      })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  getAllFonctionTypes() {
    const url = Config.baseUrl + "/fonction_types";

    return this.http.get(url, {
      headers: this.headers
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  generationAttestationFr(studentId: number, year: string, levelId: number) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-inscription/fr";

    return this.http.post(url, {
      id_level: levelId,
      year: year
    }, {
      headers: this.headers,
      responseType: ResponseContentType.Blob
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }

  generationAttestationPresenceFr(studentId: number, year: string, levelId: number) {
    this.headers.set("Authorization", "Bearer " + this.storageService.read("admin-token"));
    const url = Config.baseUrl + "/admin/student/" + studentId + "/attestation-presence/fr";

    return this.http.post(url, {
      id_level: levelId,
      year: year
    }, {
      headers: this.headers,
      responseType: ResponseContentType.Blob
    })
      .map(res => res.json())
      .catch(this.handleErrors);
  }
}
