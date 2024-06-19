import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpMockService {

  private _routes: Map<string, any> = new Map<string, any>();

  public setConfig(config: any): void {
    config.routes.forEach((route: any) => {
      this.extractPathConfig(route, "get");
      this.extractPathConfig(route, "post");
      this.extractPathConfig(route, "put");
      this.extractPathConfig(route, "delete");
    });
  }

  public clearConfig(): void {
    this._routes.clear();
  }

  public getRouteConfig(route: any, method: string): any | undefined {
    return this._routes.get(this.buildConfigKey(route, method));
  }

  private extractPathConfig(route: any, method: string): void {
    if (!route[method]) return;
    this._routes.set(this.buildConfigKey(route.path, method), route[method]);
  }

  private buildConfigKey(path: string, method: string): string {
    return `${path}|${method}`;
  }
}
