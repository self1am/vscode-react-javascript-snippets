import { SnippetString, window } from "vscode";

import { parseSnippet } from "./helpers";
import snippets from "./snippets/generated.json";

const snippetSearch = async () => {
  const { showQuickPick, activeTextEditor } = window;

  const snippetsArray = Object.entries(snippets);

  const items = snippetsArray.map(
    // @ts-expect-error
    ([shortDescription, { prefix: label, body, description }], id) => ({
      body,
      description,
      id,
      label,
      value: label,
    }),
  );

  const rawSnippet = await showQuickPick(items, {
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: "Search snippet by prefix or description",
  });

  const body = rawSnippet ? parseSnippet(rawSnippet) : "";

  if (activeTextEditor) {
    activeTextEditor.insertSnippet(new SnippetString(body));
  }
};

export default snippetSearch;
