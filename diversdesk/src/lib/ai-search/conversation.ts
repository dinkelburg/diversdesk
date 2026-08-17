export type AiSearchHistoryTurn = {
  answer: string;
  question: string;
  sourceIds: string[];
};

type SourceWithId = {
  id: string;
};

const MAX_CONTEXT_SOURCES = 6;
const CURRENT_SOURCE_BUDGET = 4;

export function getConversationRetrievalQuery(
  question: string,
  history: AiSearchHistoryTurn[],
): string {
  const previousQuestion = history.at(-1)?.question;
  return previousQuestion ? `${previousQuestion}\n${question}` : question;
}

export function mergeConversationSources<Source extends SourceWithId>(
  current: Source[],
  previous: Source[],
): Source[] {
  const seen = new Set<string>();
  return [
    ...current.slice(0, CURRENT_SOURCE_BUDGET),
    ...previous,
    ...current.slice(CURRENT_SOURCE_BUDGET),
  ]
    .filter((source) => {
      if (seen.has(source.id)) return false;
      seen.add(source.id);
      return true;
    })
    .slice(0, MAX_CONTEXT_SOURCES);
}
