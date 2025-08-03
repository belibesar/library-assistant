export function calculateSimilarity(textA: string, textB: string): number {
  const tokenize = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  const setA = new Set(tokenize(textA));
  const setB = new Set(tokenize(textB));

  const intersection = [...setA].filter((token) => setB.has(token));
  const union = new Set([...setA, ...setB]);

  const similarity = intersection.length / union.size;
  return parseFloat((similarity * 100).toFixed(2)); 
}
