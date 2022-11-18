# react-headless-markdown-editor

## 👋 Intro

A React component for simple, customizable markdown editors.

This library lets you:

- Customize your editor however you see fit (it's Headless 🙈)
- Create custom controls
- Have a simple editor up & running in a few seconds

## 🚀 How to use

### Install

```bash
npm install -S react-headless-markdown-editor
# or
yarn add react-headless-markdown-editor
# or
pnpm i react-headless-markdown-editor
```

### Usage

With no styling options

```js
import { Editor } from "react-headless-markdown-editor";

<Editor id="body" name="body" rows={25}>
  <Editor.H1Control />
  <Editor.H2Control />
  <Editor.H3Control />
</Editor>;
```

But it's easy enough to add something.

I've made it work beautifully with normal css classes or tailwind.

```js
import { Editor } from "react-headless-markdown-editor";

<Editor
  id="body"
  name="body"
  rows={25}
  // css class for the textarea
  className="textarea-class"
  // css class for the container
  containerClassName="container-class"
  // css class for the controls container
  controlsClassName="controls-class"
>
  <Editor.H1Control className="control-class" />
  <Editor.H2Control className="control-class" />
  <Editor.H3Control className="control-class" />
</Editor>;
```

Check out the [Demo](https://joaocnh.github.io/react-headless-markdown-editor/) for an example of styling

[Source Code](https://github.com/JoaoCnh/react-headless-markdown-editor/blob/main/src/App.tsx)
