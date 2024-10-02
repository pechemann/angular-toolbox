import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtxMockMethodsComponent } from '../../../../../../lib/framework/mock/documentation/component/atx-mock-methods/atx-mock-methods.component';

describe('AtxMockMethodsComponent', () => {
  let component: AtxMockMethodsComponent;
  let fixture: ComponentFixture<AtxMockMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtxMockMethodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtxMockMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new component instance', () => {
    expect(component).toBeTruthy();
  });
});
