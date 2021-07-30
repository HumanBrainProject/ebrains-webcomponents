# WIP

# EBRAINS Webcomponents

[Demo](https://humanbrainproject.github.io/ebrains-webcomponents/index.html)

Set of WebComponents for EBRAINS services. WebComponents are namespaced under `ebrains-*`

## Prettier

Code formatting is done using [Prettier](https://prettier.io/). If you wish to contribute, please install and use the Prettier extension for your editor/IDE.

## Events naming convention

Some of components might propagate some events outside of their scope. In order to not have event name duplicates, custom event names should use this pattern: `${componentName}:${eventName}`. As an example, ebrains-iam-auth custom "success" event is: `ebrains-iam-auth:success`, as you may have already guess, error one would be `ebrains-iam-auth:error`

## Existing Components

- [ebrains-yt-video/](ebrains-yt-video) Youtube video privacy warning overlay
- [ebrains-iam-auth/](ebrains-iam-auth) EBRAINS IAM frontend authentication helper
