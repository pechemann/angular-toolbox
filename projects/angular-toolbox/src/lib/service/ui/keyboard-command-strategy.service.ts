import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardCommandStrategyService implements OnInit {

  private _action: any = null;

  public ngOnInit(): void {
    const self: KeyboardCommandStrategyService = this;
    document.addEventListener('keydown', (event: KeyboardEvent)=> {
      this._action = null;
      if (!event.ctrlKey) return;
      /*if (event.ctrlKey && event.key === 'z') {
        alert('Undo!');
      }*/
    });

    document.addEventListener('keyup', (event)=> {
      if (self._action) self._action.perform();
      self._action = null;
    });
  }
}
