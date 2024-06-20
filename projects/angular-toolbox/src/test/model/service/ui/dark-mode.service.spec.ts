import { TestBed } from '@angular/core/testing';

import { DarkModeService } from '../../../../lib/model/service/ui/dark-mode.service';
import { DOCUMENT } from '@angular/common';
import { DARK_MODE_CONFIG, DarkModeConfig } from '../../../../lib/model';

describe('DarkModeService', () => {
  const browserDarkModeState: boolean =
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false;
  const clearLocalStorage: Function = ()=> localStorage.clear();
  const documentProvider: any = { provide: DOCUMENT, useValue: document };
  const defaultConfigProvider: any = { provide: DARK_MODE_CONFIG, useValue: DARK_MODE_CONFIG };
  const buildService: Function = (config: DarkModeConfig)=> {
    TestBed.configureTestingModule({ providers: [documentProvider, config] });
    return TestBed.inject(DarkModeService);
  };
  let service: DarkModeService;

  beforeEach(() => {
    clearLocalStorage();
  });

  afterEach(() => {
    clearLocalStorage();
  });

  it('should create an instance', () => {
    expect(buildService(defaultConfigProvider)).toBeTruthy();
  });
  
  it('toggleDarkMode() should change dark mode state', () => {
    service = buildService(defaultConfigProvider);
    const val1: boolean = service.darkModeEnabled();
    service.toggleDarkMode();
    const val2: boolean = service.darkModeEnabled();
    expect(val1).not.toBe(val2);
  });
  
  it('toggleDarkMode() should toggle dark mode state', () => {
    service = buildService(defaultConfigProvider);
    const val1: boolean = service.darkModeEnabled();
    service.toggleDarkMode();
    service.toggleDarkMode();
    const val2: boolean = service.darkModeEnabled();
    expect(val1).toBe(val2);
  });
  
  it('darkModeEnabled() should return false by default', () => {
    expect(buildService(defaultConfigProvider).darkModeEnabled()).toBeFalse();
  });
  
  it('getCssProperty() should return "dark-mode" by default', () => {
    expect(buildService(defaultConfigProvider).getCssProperty()).toBe("dark-mode");
  });

  it('getStorageKey() should return "dark-mode-key" by default', () => {
    expect(buildService(defaultConfigProvider).getStorageKey()).toBe("dark-mode-key");
  });

  it('enableDarkMode() should activate dark mode', () => {
    service = buildService(defaultConfigProvider);
    service.enableDarkMode();
    expect(service.darkModeEnabled()).toBeTrue();
  });
  
  it('enableDarkMode() should store dark mode state into local storage as string', () => {
    service = buildService(defaultConfigProvider);
    service.enableDarkMode();
    expect(localStorage.getItem("dark-mode-key")).toBe('true');
  });

  it('disableDarkMode() should deactivate dark mode', () => {
    service = buildService(defaultConfigProvider);
    service.enableDarkMode();
    service.disableDarkMode();
    expect(service.darkModeEnabled()).toBeFalse();
  });
  
  it('disableDarkMode() should store dark mode state into local storage as string', () => {
    service = buildService(defaultConfigProvider);
    service.enableDarkMode();
    service.disableDarkMode();
    expect(localStorage.getItem("dark-mode-key")).toBe('false');
  });

  it('invalidateStorage() should clear local storage', () => {
    service = buildService(defaultConfigProvider);
    service.enableDarkMode();
    expect(localStorage.getItem("dark-mode-key")).toBe('true');
    service.invalidateStorage()
    expect(localStorage.getItem("dark-mode-key")).toBeNull();
  });
  
  it('config provider should change dark mode state', () => {
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { darkModeEnabled: true } };
    expect(buildService(configProvider).darkModeEnabled()).toBeTrue();
  });
  
  it('config provider should change CSS property', () => {
    const CUSTOM_CSS_PROP: string = "css-property";
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { cssProperty: CUSTOM_CSS_PROP } };
    expect(buildService(configProvider).getCssProperty()).toBe(CUSTOM_CSS_PROP);
  });
  
  it('config provider should change storage key', () => {
    const CUSTOM_STORAGE_KEY: string = "storage-key";
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { storageKey: CUSTOM_STORAGE_KEY } };
    expect(buildService(configProvider).getStorageKey()).toBe(CUSTOM_STORAGE_KEY);
  });
  
  it('config provider should detect and apply browser settings', () => {
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { detectBrowserSettings: true } };
    expect(buildService(configProvider).darkModeEnabled()).toBe(browserDarkModeState);
  });

  it('constructor should read and apply local storage property', () => {
    localStorage.setItem("dark-mode-key", "true");
    expect(buildService(defaultConfigProvider).darkModeEnabled()).toBeTrue();
  });
  
  it('constructor should override local storage property when darkModeEnabled is true', () => {
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { darkModeEnabled: true } };
    localStorage.setItem("dark-mode-key", "false");
    expect(buildService(configProvider).darkModeEnabled()).toBeTrue();
  });
  
  it('constructor should create local storage property when darkModeEnabled is true', () => {
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: { darkModeEnabled: true } };
    buildService(configProvider);
    expect(localStorage.getItem("dark-mode-key")).not.toBeNull();
  });

  it('constructor should not create local storage property when darkModeEnabled is false', () => {
    buildService(defaultConfigProvider);
    expect(localStorage.getItem("dark-mode-key")).toBeNull();
  });
  
  it('detectBrowserSettings property should override darkModeEnabled property', () => {
    const provider: any = browserDarkModeState ? 
                         { darkModeEnabled: false, detectBrowserSettings: true } : 
                         { darkModeEnabled: true, detectBrowserSettings: false } ;
    const configProvider: any = { provide: DARK_MODE_CONFIG, useValue: provider };
    expect(buildService(configProvider).darkModeEnabled()).toBeTrue();
  });
  
  it('enableDarkMode() should dispatch change event', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.enableDarkMode();
    expect(service.change.emit).toHaveBeenCalled();
  });
  
  it('disableDarkMode() should dispatch change event', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.disableDarkMode();
    expect(service.change.emit).toHaveBeenCalled();
  });

  it('toggleDarkMode() should dispatch change event', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.toggleDarkMode();
    expect(service.change.emit).toHaveBeenCalled();
  });
  
  it('enableDarkMode() should dispatch change event with current dark mode state', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.enableDarkMode();
    expect(service.change.emit).toHaveBeenCalledWith(true);
  });
  
  it('disableDarkMode() should dispatch change event with current dark mode state', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.disableDarkMode();
    expect(service.change.emit).toHaveBeenCalledWith(false);
  });
  
  it('toggleDarkMode() should dispatch change event with current dark mode state', () => {
    service = buildService(defaultConfigProvider);
    spyOn(service.change, 'emit');
    service.toggleDarkMode();
    expect(service.change.emit).toHaveBeenCalledWith(true);
    service.toggleDarkMode();
    expect(service.change.emit).toHaveBeenCalledWith(false);
  });
});
