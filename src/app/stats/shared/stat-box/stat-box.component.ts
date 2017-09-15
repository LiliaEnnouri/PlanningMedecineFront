import {Component, Input, OnInit} from "@angular/core";

declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: [],
})
export class StatBoxComponent implements OnInit {


  @Input()
  css: string;

  @Input()
  pourcentage: number;

  @Input()
  number: number;

  @Input()
  title: string;

  constructor() {

  }

  ngOnInit() {

  }

}


