import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Config} from "../../../shared/config";
import {InitialPreviewConfig, Utils} from "../../../shared/utils";
import {StorageService} from "../../../shared/services/storage.service";
import {UserService} from "../../../shared/services/user.service";
import {Student} from "../../../shared/models/student";
import {Router} from "@angular/router";
declare var jQuery;
declare var swal;
@Component({
  templateUrl: 'photo.component.html'
})
export class PhotoComponent implements OnInit {
  busy: Subscription;
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

}
