import { Editor } from "../lib/main";

const controlClx =
  "inline-block p-4 text-mindera-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-mindera-500";

function App() {
  return (
    <Editor
      rows={25}
      containerClassName="w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
      controlsClassName="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-t-lg border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-b-md border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
    >
      <Editor.H1Control className={controlClx} />
      <Editor.H2Control className={controlClx} />
      <Editor.H3Control className={controlClx} />
    </Editor>
  );
}

export default App;
