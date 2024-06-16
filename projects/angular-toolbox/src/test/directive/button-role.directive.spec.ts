import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonRoleDirective } from "../../public-api";
import { RouterModule } from "@angular/router";
import { ButtonRoleDirectiveTestComponent, Key, TEST_ITEM } from "./button-role-directive-test.util";

describe('ButtonRoleDirective', () => {

    let fixture: ComponentFixture<ButtonRoleDirectiveTestComponent>;
    let decoratedElm: HTMLElement;

    const createKeyEvent = (event: string, key: string) => new KeyboardEvent(event, { key: key });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterModule,
                ButtonRoleDirective
            ],
            declarations: [
                ButtonRoleDirectiveTestComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonRoleDirectiveTestComponent);
        spyOn(fixture.componentInstance, 'onEnter');
        fixture.detectChanges();
        decoratedElm = fixture.nativeElement.querySelector("#testElm");
    });

    it('should create a "role" atribute on the decorated HTML element', async () => {
        await expect(decoratedElm.hasAttribute("role")).toBe(true);
    });
    
    it('should create a "role" atribute set to "button"', async () => {
        await expect(decoratedElm.getAttribute("role")).toBe("button");
    });
    
    it('should create a "tabIndex" atribute on the decorated HTML element', async () => {
        await expect(decoratedElm.hasAttribute("tabIndex")).toBe(true);
    });

    it('should create a "tabIndex" atribute set to "0"', async () => {
        await expect(decoratedElm.getAttribute("tabIndex")).toBe("0");
    });
    
    it('should dispatch an "enter" event when User presses the "enter" key', async () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        await expect(fixture.componentInstance.onEnter).toHaveBeenCalled();
    });
    
    it('should dispatch an "enter" event and pass the specified object as property', async () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        await expect(fixture.componentInstance.onEnter).toHaveBeenCalledWith(TEST_ITEM);
    });
    
    it('should not dispatch "enter" event when User presses any key (except for "enter" key)', async () => {
        const keys: string[] = Object.values(Key);
        keys.forEach((value: string) => {
            decoratedElm.dispatchEvent(createKeyEvent('keyup', 'value'));
        });
        fixture.detectChanges();
        await expect(fixture.componentInstance.onEnter).not.toHaveBeenCalled();
    });

    it('should invike the "blur()" method on the decorated element after event dispatching', async () => {
        decoratedElm.dispatchEvent(createKeyEvent('keyup', 'Enter'));
        fixture.detectChanges();
        await expect(fixture.componentInstance).not.toBe(document.activeElement as any);
    });
});
