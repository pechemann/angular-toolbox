import { Injectable } from '@angular/core';
import { DemoLink } from '../business/demo-link';

@Injectable({
  providedIn: 'root'
})
export class DemoListService {

  private readonly DEMO_LINK_LIST: DemoLink[] = [
    { label: "Dark Mode Service", path: "dark-mode-service" }
  ]

  public getDemoLinkList(): DemoLink[] {
    return this.DEMO_LINK_LIST;
  }
}
