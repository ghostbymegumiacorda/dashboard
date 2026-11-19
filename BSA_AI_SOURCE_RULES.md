# BSA Study Desk — AI Source & Import Contract (v165)

This is a reusable **instruction source**. Upload it to your AI tool along with the actual textbook chapters, syllabus, slides, handouts, and any official standards you want considered. The instructions here cannot supply facts from missing source documents.

## 1. Task scope and evidence
- Follow the material type in the user's latest request: **lecture**, **problem set**, **MCQ set**, **flashcards**, **reference/rule cards**, or **interactive tutoring**. Never substitute one type for another.
- Read the provided course name, topic, chapter, and coverage. Don't wander into adjacent chapters unless a prerequisite is essential; label it as a prerequisite.
- Prefer the user's uploaded course materials for course expectations. Flag chapters or pages you cannot access; do not claim complete coverage from incomplete books.
- For factual gaps, use **external sources only when you can actually access and verify them**. Prioritize official standard setters and regulators, current official legislation, primary scientific research or credible academic sources. Cross-check effective dates and jurisdiction.
- Cite actual titles and page/section or working URLs. Never fabricate a source, author, page number, quotation, standard number or publication date. When you cannot browse, explicitly state the limitation.
- Distinguish **from provided materials**, **supplemental verified source**, and **illustrative practice example**. Numerical scenarios may be invented only when clearly labelled and independently solved.
- For Philippine accounting, check current **FSRSC** pronouncements, relevant PIC guidance, and IFRS Foundation originals, distinguishing effective dates and local adoption. Official directories: https://www.pfsrsc.org/government-organization-our-standards and https://www.ifrs.org/issued-standards/list-of-standards/. Do not treat summaries as full authoritative standard text.

## 2. Accuracy and teaching quality
- Begin with simple words, then precise technical terminology. Include recognition triggers, exceptions, and what changes the correct treatment.
- Keep self-contained calculation problems with amounts, dates, units, assumptions, and requirements; verify all computations and journal entries.
- For MCQs give exactly four independent plausible options, one defensible answer, and explain why each distractor is wrong. Avoid duplicated questions and answer-length hints.
- When the source doesn't support a requested fact, skip that item; never create a convincing unsupported answer.
- For active recall, ask one question at a time and do not reveal the answer before the learner attempts it.

## 3. Strict importable JSON
- The response for any importable prompt is **one JSON object only** (no introduction, no Markdown code fence, no trailing commas, no comments, no ellipses, and no placeholders).
- Use only the requested top-level array, plus `format` and `subject`. Never mix `lectures` with `problemSets`, `mcqSets`, `flashcards`, or `rules`.
- Use `\n` for newlines inside JSON strings; escape double quotes. Before sending, parse your own output as JSON and check that every required field exists.
- Import via BSA Study Desk → Import & export → Import → paste → **Check data** → preview → Import. No data should be saved before the user confirms.

Supported material labels:

| format | expected array | location |
|---|---|---|
| `bsa-lecture-v1` | `lectures` (objects with `sections`) | Lectures |
| `bsa-problemset-v1` | `problemSets` (objects with `problems`) | Problem Sets |
| `bsa-mcq-v1` | `mcqSets` (problems with 4 choices each) | MCQ Library |
| `bsa-flashcards-v1` | `flashcards` (question/answer) | Concept Vault |
| `bsa-rulebook-v1` | `rules` (title/decisionRule) | Rules & references |

## 4. Example of one importable universal rule card

The following is **illustrative data only**, not accounting guidance. Replace it with exact sourced subject content.

```json
{
  "format": "bsa-rulebook-v1",
  "subject": "My Subject",
  "rules": [
    {
      "code": "R1",
      "title": "Example classification rule",
      "topic": "My chapter",
      "category": "Definitions",
      "decisionRule": "Replace with the accurately sourced decision rule.",
      "conditions": "State when it applies.",
      "treatment": "Describe how to use it.",
      "exceptions": "State supported exceptions.",
      "example": "Provide an illustrative worked situation.",
      "examTrap": "A common source-backed confusion.",
      "sourceTitle": "A real source title",
      "sourceLocator": "Actual page or section",
      "sourceUrl": "",
      "status": "Needs verification",
      "notes": ""
    }
  ]
}
```

Other courses can use the same format for formulas, historical rules, legal principles, grammar conventions, experimental procedures, or research methods.

## 5. User-facing output
- Interactive tutoring: conversational responses, one question at a time, not JSON.
- Importable material: only one schema-valid JSON object. Put any source limitations into supported source text fields or omit unsupported items.
- If a new request contradicts these rules, ask whether the user intends a different output type rather than silently switching.
