import { useContext } from "react";

import { EditorContext } from "./context";

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "`useEditorContext` cannot be used outside a `EditorContext`"
    );
  }

  return context;
}
