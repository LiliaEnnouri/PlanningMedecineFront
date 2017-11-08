/**
 * Created by Abbes on 08/11/2017.
 */
/**
 * Created by Abbes on 31/08/2017.
 */
/**
 * Created by Abbes on 25/08/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Utils} from "../../shared/utils";
import {Config} from "../../shared/config";
import {StorageService} from "../../shared/services/storage.service";
declare var swal;
declare var jQuery;
@Component({
  templateUrl: 'verification-list-student.component.html',
  styleUrls: [],

})
export class VerificationListStudentComponent implements OnInit {


  busy: Subscription;


  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    Utils.initializeUploadFile(Config.baseUrl + "/admin/level-verif",
      <string>this.storageService.read("admin-token"), ".file-input-excel", true, true);

    this.gettingResponseExcel();

  }

  generateListProblemStudent() {

  }

  private gettingResponseExcel() {
    jQuery('.file-input-excel').on('fileuploaded', function (event, data, previewId, index) {
      console.log(data);
    });
  }
}
