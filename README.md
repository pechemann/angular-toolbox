# AngularToolbox
<p align="center">
  <img src="projects/angular-toolbox/src/assets/images/logos/angular-toolbox.png" alt="angular-toolbox-logo" width="120px" height="120px"/>
  <br>
  <i>A library that provides useful tools for Angular apps development.</i>
  <br>
</p>

[![Angular Toolbox version](https://img.shields.io/badge/Angular%20Toolbox-beta-%231E90FF.svg)]()

## Installation

```
npm install angular-toolbox
```

## Examples

### 1. `SubscriptionService`

An easy-to-use and lightweight service to manage Angular subscriptions and prevent performance issues.

```typescript
const COMP_REF: string = 'MyComponentName';

...

constructor(private _myService: MyService,
            private _myHttpService: MyHttpService,
            private _subscriptions: SubscriptionService) {}

// Unsubscribe all subscriptions:
public ngOnDestroy(): void {
    this._subscriptions.clearAll(COMP_REF);
}

// Create as many subscriptions as you want:
public ngOnInit(): void {
    this._subscriptions.register(COMP_REF, 
                            this._myService.myMethod1().subscribe()
                        ).register(COMP_REF, 
                            this._myHttpService.get('test').subscribe(result => console.log(result))
                        );
}

public myMethod(): void {
    this._subscriptions.register(COMP_REF, 
        this._myService.myMethod2().subscribe()
    );
}
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
