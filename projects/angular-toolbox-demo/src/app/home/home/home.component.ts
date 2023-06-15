import { Component } from '@angular/core';
import { DemoListService } from '../../model/service/demo-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public demoList: DemoListService) {}
}
