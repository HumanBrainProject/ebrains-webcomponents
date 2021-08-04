# ebrains-toast

Container for content that should appear as a toast, bottom right of the viewport.

## Attributes

| name | description                                                                                                          | mandatory |
| ---- | -------------------------------------------------------------------------------------------------------------------- | --------- |
| open | Makes the toast open, put "1" for opening the toast. Other values will do nothing or make it close if already opened |           |

## Style

CSS custom properties

| property                   | description  | default        |
| -------------------------- | ------------ | -------------- |
| --ebrains-toast-background | Toast        | #FFF           |
| --ebrains-toast-border     | Toast border | 1px solid #EEE |
| --ebrains-toast-width      | Toast width  | 300px          |

## Events

| name                | description      |
| ------------------- | ---------------- |
| ebrains-toast:open  | Toast is opening |
| ebrains-toast:close | Toast is closing |

## Usage

1. Reference component

```
<script src="https://cdn.jsdelivr.net/gh/HumanBrainProject/ebrains-webcomponents@{version}/ebrains-toast/ebrains-toast.js"></script>
```

2. Add Element to document

```
<ebrains-toast open="1">
	<h1>Title</h1>
	<p>Toast content</p>
</ebrains-toast>
```

Children elements are rendered as `ebrains-toast` content.
