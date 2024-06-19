import { Injectable } from '@angular/core';
import { DemoLink } from '../business/demo-link';

@Injectable({
  providedIn: 'root'
})
export class DemoListService {

  private readonly DEMO_LINK_LIST: DemoLink[] = [
    { label: "Dark Mode Service", path: "dark-mode-service" },
    { label: "Scroll Service", path: "scroll-service" },
    { label: "Subscription Service", path: "subscription-service" },
    { label: "ButtonRole Directive", path: "button-role-directive" },
    { label: "Version Service", path: "version-directive" },
    { label: "Dark Mode Service: Bootstrap Integration", path: "dark-mode-service-bootstrap" },
    { label: "HTTP Mock Service", path: "http-mock-service" }
  ]

  public getDemoLinkList(): DemoLink[] {
    return this.DEMO_LINK_LIST;
  }
}
