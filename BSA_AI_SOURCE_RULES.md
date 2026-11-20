# BSA Study Desk — AI Source & Import Contract (v169)

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

## Group rules into one searchable library
- Every rule in one standard must have the **same `collection`** value: for example, `"collection": "PAS 7"`. Do NOT create 36 different collections for 36 clauses.
- Give individual cards distinct `code` values such as `PAS 7-01`, `PAS 7-02`, etc. The dashboard also groups previously imported `PAS 7-01` style codes automatically, with no reimport needed.
- Separate collections for PAS 7, PAS 10, PFRS 15, or a named module in any other subject. Do not mix unrelated standards into the same JSON collection.
- `collection` is optional for backward compatibility, but strongly recommended for all new rulebook exports.
- A provided source citation does **not** mean the dashboard independently verified it; check effective dates and the exact cited passage.

## 4. Example of one importable universal rule card

The following is **illustrative data only**, not accounting guidance. Replace it with exact sourced subject content.

```json
{
  "format": "bsa-rulebook-v1",
  "subject": "My Subject",
  "rules": [
    {
      "collection": "Chapter 1 Reference",
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


## v172 — source-complete rulebooks and separate PDF workflow
- A rulebook has **no default five-rule limit**. Cover every substantive sourced rule in the selected scope, one standard/collection at a time.
- For extensive standards, produce sequential JSON batches (normally 20 substantial rules at a time) with stable unique codes and `coverage` metadata. Batches are an output-size safeguard, **not** a limit on coverage.
- Do not split synonymous statements into 36 needlessly repetitive cards. Give a rule only if it supports a distinct decision, exception, application or treatment.
- Rules and lectures have no question difficulty setting. Difficulty and item counts apply only to practice material when specified.
- A selected local PDF must be uploaded **separately** to the AI chat. The dashboard does not silently send PDF contents or OCR scanned pages, and PDF files are not valid rulebook JSON.
- Keep a downloaded copy of valuable PDF sources: they are stored only in this device's IndexedDB, not GitHub, shared publishing, or normal JSON backups.


## v175: Copy-ready imported JSON and lecture citations
- When asked for dashboard-importable JSON, return exactly **one `json` fenced code block** and nothing else. Use the chat's **Copy code** button: it copies the raw JSON without the fence. If the AI interface has no copy-code button, return only one raw JSON object.
- Ensure valid JSON syntax, including escaped newlines inside quoted strings, before sending. Never mix lectures, rule cards, MCQs, flashcards, and problem sets into one typed import response.
- For **lectures**, cite the provided reference in each lecture object's **`source`** field. Do not put repeated `SOURCE:` or `REFERENCES:` lines at the start of each section. Explain concepts in `sections[].body`; keep `problems` exclusively in problem-set or MCQ formats.
- For rulebook cards, source references still belong on each individual rule (`sourceTitle` and `sourceLocator`/`sourceUrl`), because rules may have different authorities.

## v176: Lecture readability and print/PDF pagination
- Treat a lecture as a guided chapter, not a single long essay. Every major topic should have a clear section heading and explanatory paragraphs.
- In `sections[].body`, use Markdown only when it improves learning: **bold** essential rules, `##` meaningful subheadings, ordered steps, concise bullets, `>` worked illustrations and Markdown tables for genuine comparisons or calculations.
- Put full worked computations, journal entries and distinctions in properly separated blocks. Include a concrete example after difficult rules, and add relevant questions and checked answers to `checks` without turning the lecture into a problem set.
- Do not add a repeated source line in every section; keep genuine citations in the lecture-level `source` field.
- For print/PDF, keep illustrations, tables, headings and their first explanations together when practical. Avoid enormous tables or giant uninterrupted sections that cannot fit on a page. Do not delete important material just to shorten the output.
