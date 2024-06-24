import { Injectable } from '@angular/core';
import { IconListItem } from '../../ui/model/business/icon-list-item';

@Injectable({
  providedIn: 'root'
})
export class DemoListService {

  private readonly DEMO_LINK_LIST: IconListItem[] = [
    { label: "HTTP Mock Service", urlTree: ["../demo", "http-mock-service"] },
    { label: "Subscription Service", urlTree: ["../demo", "subscription-service"] },
    { label: "HTTP Mock Error", urlTree: ["../demo", "http-mock-error"] },
    { label: "Dark Mode Service", urlTree: ["../demo", "dark-mode-service"] },
    { label: "ButtonRole Directive", urlTree: ["../demo", "button-role-directive"] },
    { label: "Dark Mode Service: Bootstrap Integration", urlTree: ["../demo", "dark-mode-service-bootstrap"] },
    { label: "Scroll Service", urlTree: ["../demo", "scroll-service"] },
    { label: "Version Service", urlTree: ["../demo", "version-service"] }
  ];

  public getDemoLinkList(): IconListItem[] {
    return this.DEMO_LINK_LIST;
  }
}
