# AngularToolbox

A library that provides useful tools for Angular apps development.

[![Angular Toolbox version](https://img.shields.io/badge/Angular%20Toolbox-beta-%231E90FF.svg)]()

## Installation

```
npm install angular-toolbox
```

## Examples

### 1. `SubscriptionService`

An easy-to-use and lightweight service to manage Angular subscriptions and prevent performance issues of your applications.

```typescript
public obj: MyInterface;

constructor(private _myService: MyService,
            private _myHttpService: MyHttpService,
            private _subscriptions: SubscriptionService) {}

// Unsubscribe from all subscriptions at once:
public ngOnDestroy(): void {
    this._subscriptions.clearAll('MyCOmponent');
}

// Create as many subscription as you want:
public ngOnInit(): void {
    this._subscriptions.register('MyCOmponent', 
                            this._myService.myMethod1().subscribe()
                        ).register('MyCOmponent', 
                            this._myHttpService.myMethod1('test').subscribe(
                                result => this.obj = result
                            )
                        );
}

public myMethod(): void {
    this._subscriptions.register('MyCOmponent', 
        this._myService.myMethod2().subscribe()
    );
}
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
