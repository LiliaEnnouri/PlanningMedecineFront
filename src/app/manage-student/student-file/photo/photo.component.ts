import {Component, Input, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {Student} from "../../../shared/models/student";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {Config} from "../../../shared/config";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
declare let jQuery;
declare let swal;
@Component({
  selector: 'app-student-photos',
  templateUrl: 'photo.component.html'
})
export class PhotoComponent implements OnInit {
  busy: Subscription;

  @Input()
  student: Student;

  constructor(private storageService: StorageService, private userServices: UserService,
              private router: Router) {

  }

  ngOnInit(): void {
    if (!this.student.img) {
      Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/photo/upload",
        this.userServices.getTokent(), ".file-input-student-photo", 1);
    } else {
      this.initStudentPhoto();
    }
    if (!this.student.imgs_cin) {
      Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/cin/upload",
        this.userServices.getTokent(), ".file-input-student-cin", 2);
      this.student.imgs_cin = [];
    } else {
      this.initStudentCin();
    }
    if (!this.student.extrait_naissance) {
      Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/extrait-naissance/upload",
        this.userServices.getTokent(), ".file-input-student-extrait-naissance", 1);
    } else {
      this.initStudentExtraitNaissance();
    }

    if (!this.student.attestation_orientation) {
      Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/attestation-orientation/upload",
        this.userServices.getTokent(), ".file-input-student-attestation-orientation", 1);
    } else {
      this.initStudentAttestationOrientation();
    }

    const baseContext = this;
    jQuery('.file-input-student-photo').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.img = baseContext.student.img = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
      baseContext.router.navigate(["/student-file"]);
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.img = baseContext.student.img = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre photo',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });

    jQuery('.file-input-student-extrait-naissance').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.extrait_naissance = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre extrait de naissance',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
      baseContext.router.navigate(["/student-file"]);
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.extrait_naissance = baseContext.student.extrait_naissance = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre extrait de naissance',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
    jQuery('.file-input-student-attestation-orientation').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.attestation_orientation = baseContext.student.attestation_orientation = data.response.media;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre attestation d\'orientation',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
      baseContext.router.navigate(["/student-file"]);
    }).on('filedeleted', function (event, key, jqXHR, data) {
      baseContext.student.attestation_orientation = baseContext.student.attestation_orientation = null;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre attestation d\'orientation',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });

    jQuery('.file-input-student-cin').change(function () {
      console.log('file input change');
    }).on('fileuploaded', function (event, data, previewId, index) {
      baseContext.student.imgs_cin.push(data.response.media);
      baseContext.student.imgs_cin = baseContext.student.imgs_cin;
      console.log("fileuploaded");
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez ajouté une photo de votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
      baseContext.router.navigate(["/student-file"]);
    }).on('filedeleted', function (event, key, jqXHR, data) {
      const medias = [];
      baseContext.student.imgs_cin.forEach(function (img_cin) {
        medias.push(img_cin.path);
      });
      const index = medias.indexOf(jqXHR.responseJSON.media, 0);
      if (index > -1) {
        baseContext.student.imgs_cin.splice(index, 1);
      }
      baseContext.student = baseContext.student;
      baseContext.storageService.write("student", baseContext.student);
      swal({
        title: "Succés!",
        text: 'Vous avez supprimé votre CIN',
        confirmButtonColor: "#66BB6A",
        type: "success"
      });
    });
  }

  private initStudentPhoto() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.img;
    medias.push(this.student.img.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Photo,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-photo", 1, inputMedias, initialPreviewConfig);
  }

  private initStudentExtraitNaissance() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.extrait_naissance;
    medias.push(this.student.extrait_naissance.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Extrait_Naissance,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-extrait-naissance", 1, inputMedias, initialPreviewConfig);
  }

  private initStudentAttestationOrientation() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    const studentImg = this.student.attestation_orientation;
    medias.push(this.student.attestation_orientation.path);
    inputMedias.push(Config.baseUrl + '/' + studentImg.path);
    initialPreviewConfig.push({
      type: Utils.loadTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      filetype: Utils.loadFileTypeFromExtension(studentImg.path.substr(studentImg.path.indexOf('.') + 1)),
      key: studentImg.id_Student_Attestation_Orientation,
      url: Config.baseUrl + '/' + studentImg.path + '/delete',
      size: studentImg.size
    });
    Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/photo/upload",
      this.userServices.getTokent(), ".file-input-student-attestation-orientation", 1, inputMedias, initialPreviewConfig);
  }

  private initStudentCin() {
    const medias = [];
    const inputMedias = [];
    const initialPreviewConfig: InitialPreviewConfig[] = [];
    this.student.imgs_cin.forEach(function (img_cin) {
      medias.push(img_cin.path);
      inputMedias.push(Config.baseUrl + '/' + img_cin.path);
      initialPreviewConfig.push({
        type: Utils.loadTypeFromExtension(img_cin.path.substr(img_cin.path.indexOf('.') + 1)),
        filetype: Utils.loadFileTypeFromExtension(img_cin.path.substr(img_cin.path.indexOf('.') + 1)),
        key: img_cin.id_Student_Cin,
        url: Config.baseUrl + '/' + img_cin.path + '/delete',
        size: img_cin.size
      });
    });
    Utils.initializeUploadFile(Config.baseUrl + "/student/" + this.student.id_student + "/cin/upload",
      this.userServices.getTokent(), ".file-input-student-cin", 2, inputMedias, initialPreviewConfig);
  }

}
