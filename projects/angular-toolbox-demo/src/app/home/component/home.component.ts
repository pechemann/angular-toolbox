/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { Component } from '@angular/core';
import { IconListService } from '../../ui/model/service/icon-list-list.service';
import { AnchorLinklDirective } from 'projects/angular-toolbox/src/public-api';
import { AngularToolboxCodeViewportComponent, AngularToolboxGitSectionComponent, AngularToolboxHrComponent, AngularToolboxIconListComponent, AngularToolboxPageTitleComponent, BreadcrumbService } from 'projects/angular-toolbox-demo-component-lib/src/public-api';
import { NgOptimizedImage } from '@angular/common';
import { YouTubeLink } from '../model/youtube-link';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AngularToolboxGitSectionComponent,
    AnchorLinklDirective,
    AngularToolboxCodeViewportComponent,
    AngularToolboxPageTitleComponent,
    AngularToolboxIconListComponent,
    AngularToolboxHrComponent,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  protected youtubeLinks: YouTubeLink[] = [
    {
      title: "Angular Toolbox: HTTP Mocking Framework",
      link: "https://youtu.be/zN0SEgovFbc",
      img: "http-mocking-framework"
    },
    {
      title: "Bypassing CORS Restrictions When Developing Angular Applications",
      link: "https://youtu.be/pSsugUwgCLc",
      img: "cors-restrictions"
    }
  ];

  constructor(public iconListService: IconListService,
              breadcrumb: BreadcrumbService) {
    breadcrumb.removeAll();
  }
}
