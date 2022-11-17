import { useState } from "react";

import { Editor } from "../lib/main";

const controlClx =
  "inline-block p-4 text-mindera-600 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-mindera-500";

const LinkIcon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
};

const ImageIcon = ({ className }: { fill?: string; className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
};

const SpinnerIcon = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [uploading, setUploading] = useState(false);

  async function fakeUpload() {
    setUploading(true);
    await timeout(3000);
    setUploading(false);
    return "/url/to/fake/file.png";
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">
        react-headless-markdown-editor
      </h1>

      <div className="mt-4">
        <Editor
          rows={25}
          containerClassName="w-full bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700"
          controlsClassName="flex flex-wrap text-sm font-medium text-center text-gray-500 bg-gray-50 rounded-t-lg border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-b-md border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
        >
          <Editor.H1Control className={controlClx} />
          <Editor.H2Control className={controlClx} />
          <Editor.H3Control className={controlClx} />
          <Editor.LinkControl className={controlClx}>
            <LinkIcon className="w-5 h-5" />
          </Editor.LinkControl>
          <Editor.ImageControl className={controlClx} uploader={fakeUpload}>
            {uploading ? <SpinnerIcon /> : <ImageIcon className="w-5 h-5" />}
          </Editor.ImageControl>
        </Editor>
      </div>
    </>
  );
}

export default App;
