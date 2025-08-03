export interface PlagiarismSource {
  title: string;
  author: string;
  score: number;
  quote: string;
}

export interface PlagiarismResult {
  similarity: number;
  status: "warning" | "success" | "error";
  sources: PlagiarismSource[];
  checkedAt: string;
  warning: string;
  recommendation: string;
}
