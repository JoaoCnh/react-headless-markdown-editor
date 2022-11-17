import { createContext } from "react";

interface IEditorContext {
  getSelection: () => string;
  insertIntoCursor: (
    text: string,
    selection?: string,
    breakLine?: boolean
  ) => void;
}

export const EditorContext = createContext<IEditorContext>({
  getSelection: () => "",
  insertIntoCursor: () => {},
});
