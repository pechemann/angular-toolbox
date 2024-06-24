import { Injectable } from '@angular/core';
import { IconListItem } from '../../ui/model/business/icon-list-item';

@Injectable({
  providedIn: 'root'
})
export class DemoListService {

  private readonly DEMO_LINK_LIST: IconListItem[] = [
    { label: "Dark Mode Service", urlTree: ["../demo", "dark-mode-service"] },
    { label: "Scroll Service", urlTree: ["../demo", "scroll-service"] },
    { label: "Subscription Service", urlTree: ["../demo", "subscription-service"] },
    { label: "ButtonRole Directive", urlTree: ["../demo", "button-role-directive"] },
    { label: "Version Service", urlTree: ["../demo", "version-service"] },
    { label: "Dark Mode Service: Bootstrap Integration", urlTree: ["../demo", "dark-mode-service-bootstrap"] },
    { label: "HTTP Mock Service", urlTree: ["../demo", "http-mock-service"] }
  ];

  public getDemoLinkList(): IconListItem[] {
    return this.DEMO_LINK_LIST;
  }
}
