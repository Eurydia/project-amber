export type GroupedSubmissions = {
  questions: Array<{
    id: string | number;
    question: string;
    visible: boolean;
  }>;
  answer: string | null;
  id: string;
};
