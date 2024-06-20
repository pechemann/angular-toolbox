import { Injectable } from '@angular/core';
import { HttpRouteMock, HttpMockConfig, HttpMethodMock } from '../../../model';

@Injectable({
  providedIn: 'root'
})
export class HttpMockService {

  private _configList: Map<string, HttpMethodMock> = new Map<string, any>();

  public setConfig(config: HttpMockConfig): void {
    config.routes.forEach((route: HttpRouteMock) => {
      this.extractPathConfig(route, "get");
      this.extractPathConfig(route, "post");
      this.extractPathConfig(route, "put");
      this.extractPathConfig(route, "delete");
    });
  }

  public clearConfig(): void {
    this._configList.clear();
  }

  public getMethodConfig(path: string, method: string): HttpMethodMock | undefined {
    return this._configList.get(this.buildConfigKey(path, method));
  }

  private extractPathConfig(route: any, method: string): void {
    if (!route[method]) return;
    this._configList.set(this.buildConfigKey(route.path, method), route[method]);
  }

  private buildConfigKey(path: string, method: string): string {
    return `${path}|${method}`;
  }
}
