import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";

export function renderAiAnswerMarkdown(value: string): string {
  return micromark(value, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });
}
