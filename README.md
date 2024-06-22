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

## Why Angular Toolbox?

As a Software Architect, I have noticed that Angular developers are always facing recurring development problems.

Since I use custom tools in my own projects to easily solve some of these problems, I have decided to gather them into the **Angular Toolbox**.

## A Standalone Module

**Angular Toolbox** does not include any third-party dependencies!

This philosophy comes from my personal experience with managing external modules. It aims to address two major problems we all have to deal with:

1. Versions Compatibility: 
2. Security Issues:

...

...

Moreover, developing the **Angular Toolbox** as *Standalone Module* ensure a better test coverage, to increase quality of the project.

## Tools

Below is a list of few functionalities provided by the Angular Toolbox.

### 1. Developmenet Tools

| Name | Description  |
|---|---|
| HTTP Mocking Framework | An easy-to-use framework that allows developers to transparently simulate HTTP requests in Angular applications. |

### 2. Production Tools

| Name | Description  |
|---|---|
| Subscription Service | A lightweight service that provides easy-to-use functionalities for managing observable subscriptions in Angular applications. |
| ButtonRole Directive | A directive that enables keyboard navigation and provides support for keyboard `Enter` key events. |
| Dark Mode Service | Provides a flexible *Dark Mode* implementation for your Angular applications. |

And much more...

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
