export const QUESTION_AI_PROMPT = `You are converting a photographed/scanned exam question paper into structured JSON for PyqDeck.

Return ONLY a valid JSON array, no other text, in this exact shape:

[
  {
    "mdText": "Question text here, in Markdown",
    "type": "mcq" | "short" | "long" | "numerical" | "coding",
    "difficulty": "easy" | "medium" | "hard",
    "marks": 5,
    "estimatedTime": 10,
    "options": [{ "text": "Option text", "isCorrect": true }]
  }
]

Rules:
- "difficulty", "marks", "estimatedTime" (minutes), and "options" are all optional -- omit a field entirely if you don't know it, don't guess.
- "options" is required only when "type" is "mcq": include at least 2 options, and mark exactly one with "isCorrect": true.
- Use proper Markdown in "mdText" for formatting (**bold**, code blocks, etc.) and describe any diagrams in words.
- Extract every question from the paper, in order. No duplicates.

Process the attached image(s) now and return the JSON array.`;
