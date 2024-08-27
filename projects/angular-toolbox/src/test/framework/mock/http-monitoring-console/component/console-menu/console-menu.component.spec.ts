/**
 * @license
 * Copyright Pascal ECHEMANN. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be found in
 * the LICENSE file at https://pascalechemann.com/angular-toolbox/resources/license
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtxConsoleMenuComponent } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/component/console-menu/console-menu.component';
import { AtxConsoleActionType } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/business/atx-console-action-type';
import { AtxUserActionService } from 'projects/angular-toolbox/src/lib/framework/mock/http-monitoring-console/model/service/atx-user-action.service';
import { DATA } from '../../test-util/http-monitoring-test-util';

describe('ConsoleMenuComponent', () => {

  let service: AtxUserActionService;
  let component: AtxConsoleMenuComponent;
  let fixture: ComponentFixture<AtxConsoleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxConsoleMenuComponent],
      providers: [AtxUserActionService]
    })
    .compileComponents();
    service = TestBed.inject(AtxUserActionService);
    fixture = TestBed.createComponent(AtxConsoleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
  
  it('clear button should use "Clear network log" as the title property value', () => {
    const li = fixture.nativeElement.querySelector('#clear-btn');
    expect(li.title).toEqual("Clear network log");
  });
  
  it('filter button should use "Filter" as the title property value', () => {
    const li = fixture.nativeElement.querySelector('#filter-btn');
    expect(li.title).toEqual("Filter");
  });
  
  it('search button should use "Search" as the title property value', () => {
    const li = fixture.nativeElement.querySelector('#search-btn');
    expect(li.title).toEqual("Search");
  });
  
  it('import button should use "Import" as the title property value', () => {
    const li = fixture.nativeElement.querySelector('#import-btn');
    expect(li.title).toEqual("Import");
  });
  
  it('export button should use "Export" as the title property value', () => {
    const li = fixture.nativeElement.querySelector('#export-btn');
    expect(li.title).toEqual("Export");
  });
  
  it('clear button should invoke AtxUserActionService.sendAction() with AtxConsoleActionType.CLEAR_LOGS when the user cicks on it', () => {
    spyOn(service, "sendAction");
    const li = fixture.nativeElement.querySelector('#clear-btn');
    li.click();
    expect(service.sendAction).toHaveBeenCalledOnceWith(AtxConsoleActionType.CLEAR_LOGS);
  });
  
  it('import button should invoke the click() method of the input filed when the user cicks on it', () => {
    const input = fixture.nativeElement.querySelector("input");
    spyOn(input, "click");
    const li = fixture.nativeElement.querySelector('#import-btn');
    li.click();
    expect(input.click).toHaveBeenCalled();
  });
  
  it('input field should accept only hmfl files', () => {
    const input = fixture.nativeElement.querySelector("input");
    expect(input.accept).toEqual(".hmfl");
  });
  
  it('input field change event should invoke AtxUserActionService.sendAction() with AtxConsoleActionType.IMPORT_LOGS ans the file list of the event target', () => {
    spyOn(service, "sendAction");
    const input = fixture.nativeElement.querySelector("input");
    const dt: DataTransfer = new DataTransfer();
    input.files = dt.files;
    dt.items.add(new File([JSON.stringify(DATA)], "test.file"));
    input.dispatchEvent(new Event('change'));
    expect(service.sendAction).toHaveBeenCalledOnceWith(AtxConsoleActionType.IMPORT_LOGS, dt.files);
  });
  
  it('export button should invoke AtxUserActionService.sendAction() with AtxConsoleActionType.EXPORT_LOGS when the user cicks on it', () => {
    spyOn(service, "sendAction");
    const li = fixture.nativeElement.querySelector('#export-btn');
    li.click();
    expect(service.sendAction).toHaveBeenCalledOnceWith(AtxConsoleActionType.EXPORT_LOGS);
  });
});
