import {
  useRef,
  useMemo,
  Children,
  isValidElement,
  ComponentProps,
  ChangeEvent,
  MouseEvent,
} from "react";

import { EditorContext } from "./context";
import { useEditorContext } from "./useEditorContext";

export const Editor = ({
  containerClassName,
  controlsClassName,
  children,
  ...delegated
}: EditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const context = useMemo(
    () => ({
      getSelection() {
        return window.getSelection()?.toString() ?? "";
      },
      insertIntoCursor(
        text: string,
        selection: string = "",
        breakLine: boolean = false
      ) {
        const textarea = textareaRef.current;

        if (!textarea) return;

        const cursorPosition = textarea.selectionStart;
        const cursorPositionEnd = selection
          ? textarea.selectionEnd
          : cursorPosition;
        const textBeforeCursorPosition = textarea.value.substring(
          0,
          cursorPosition
        );
        const textAfterCursorPosition = textarea.value.substring(
          cursorPositionEnd,
          textarea.value.length
        );

        let value = `${textBeforeCursorPosition}${text}${textAfterCursorPosition}`;
        if (breakLine) {
          value += `\r\n`;
        }

        textarea.value = value;

        textarea.focus();
      },
    }),
    []
  );

  return (
    <div className={containerClassName}>
      <ul className={controlsClassName}>
        <EditorContext.Provider value={context}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return null;

            return child;
          })}
        </EditorContext.Provider>
      </ul>
      <textarea
        ref={textareaRef}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-b-md border border-gray-300 focus:ring-mindera-500 focus:border-mindera-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-mindera-500 dark:focus:border-mindera-500"
        {...delegated}
      ></textarea>
    </div>
  );
};

type ControlProps = ComponentProps<"button">;

Editor.Control = function EditorControl(props: ControlProps) {
  return <button type="button" {...props} />;
};

Editor.H1Control = function H1Control({
  children,
  onClick,
  ...delegated
}: ControlProps) {
  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    const selection = getSelection();
    insertIntoCursor(`# ${selection || "h1-goes-here"}`, selection, true);
  }

  return (
    <Editor.Control onClick={handleClick} {...delegated}>
      {children || "H1"}
    </Editor.Control>
  );
};

Editor.H2Control = function H2Control({
  children,
  onClick,
  ...delegated
}: ControlProps) {
  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    const selection = getSelection();
    insertIntoCursor(`## ${selection || "h2-goes-here"}`, selection, true);
  }

  return (
    <Editor.Control onClick={handleClick} {...delegated}>
      {children || "H2"}
    </Editor.Control>
  );
};

Editor.H3Control = function H3Control({
  children,
  onClick,
  ...delegated
}: ControlProps) {
  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    const selection = getSelection();
    insertIntoCursor(`### ${selection || "h3-goes-here"}`, selection, true);
  }

  return (
    <Editor.Control onClick={handleClick} {...delegated}>
      {children || "H3"}
    </Editor.Control>
  );
};

Editor.LinkControl = function LinkControl({
  children,
  onClick,
  ...delegated
}: ControlProps) {
  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    const selection = getSelection();
    insertIntoCursor(
      `[${selection || "link-text-goes-here"}](link-url-goes-here)`,
      selection
    );
  }

  return (
    <Editor.Control onClick={handleClick} {...delegated}>
      {children || "Link"}
    </Editor.Control>
  );
};

Editor.QuoteControl = function QuoteControl({
  children,
  onClick,
  ...delegated
}: ControlProps) {
  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    const selection = getSelection();
    insertIntoCursor(`> ${selection || "quote-goes-here"}`, selection);
  }

  return (
    <Editor.Control onClick={handleClick} {...delegated}>
      {children || "Quote"}
    </Editor.Control>
  );
};

Editor.ImageControl = function ImageControl({
  children,
  uploader,
  onClick,
  ...delegated
}: {
  uploader: (file: File) => Promise<string>;
} & ControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { getSelection, insertIntoCursor } = useEditorContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    inputRef.current?.click();
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files || [];

    try {
      const url = await uploader(file);

      if (!url) return;

      const selection = getSelection();
      insertIntoCursor(
        `[${selection || "image-alt-text"}](${url} "caption")`,
        selection
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Editor.Control onClick={handleClick} {...delegated}>
        {children || "Image"}
      </Editor.Control>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </>
  );
};

interface EditorProps extends ComponentProps<"textarea"> {
  containerClassName?: string;
  controlsClassName?: string;
}
