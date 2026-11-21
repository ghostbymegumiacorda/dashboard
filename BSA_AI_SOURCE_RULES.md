# BSA Study Desk — Source-First AI and JSON Import Contract

Version: V4.6.1 (2026-11-21). Works with the subject-adaptive dashboard (including CFAS, Financial Markets, mathematics, history, theology, and custom subjects). Attach this document alongside the **actual course sources** when asking another AI to create importable study material.

**Important:** These are instructions only. They do not contain textbook facts, standards, verified questions, or answers. A subject profile is not a source document.

## A. Universal evidence rules

1. Identify **subject**, **topic**, source title/edition, the pages/chapters available, and the requested output format.
2. Use the attached textbook, lecture, syllabus, exercises, or official standard as the primary source. Preserve scope, figures, conditions, and terminology; do not claim to have read missing pages.
3. Use external sources only if the AI can actually access and verify them. Label external facts as supplemental, check jurisdiction and effective dates, and cite real URLs or source sections. Do not fabricate sources, pages, standards, editions, or answer keys.
4. Omit unsupported information rather than fill gaps with plausible-sounding facts. An original practice scenario is allowed only when clearly labeled **illustrative**, internally solvable, and independently checked.
5. Verify numerical solutions and MCQ answer keys. For a rule, distinguish the applicability trigger, treatment, exceptions, conditions, and actual evidence locator.
6. Before generating a large pack, compare its content internally: remove exact duplicates, near-identical paraphrases, repeated lecture sections, duplicated rule codes, and materially identical questions. Never silently replace an existing learner's corrections or progress.
7. **Do not confuse subject coverage with mastery.** Material present means the topic has resources, not that the learner understands it.

## B. Choose exactly one output contract

For any import request, return **one valid JSON object only**, with no markdown fence, preface, comments, trailing commas, unescaped newlines, `NaN`, or placeholder items. Use the format matching the selected dashboard import screen.

| Format | Required content | Purpose |
|---|---|---|
| `bsa-topic-pack-v1` | `subject`, `topic`, and some of `topics`, `lectures`, `problemSets`, `mcqSets`, `flashcards`, `rules` | **Mixed-format** topic pack. Include multiple arrays together. Empty arrays are allowed; at least one array must contain content. |
| `bsa-lecture-v1` | `subject`, nonempty `lectures` array | Only lectures with real `sections`. |
| `bsa-problemset-v1` | `subject`, nonempty `problemSets` array | Only written practice sets with complete `problems`. |
| `bsa-mcq-v1` | `subject`, nonempty `mcqSets` array | Only MCQ sets. Each problem needs exactly four `choices` and an answer beginning `A`, `B`, `C`, or `D`. |
| `bsa-flashcards-v1` | `subject`, nonempty `flashcards` array | Only flashcards. Each needs a question/front and answer/back. |
| `bsa-rulebook-v1` | `subject`, **one nonempty `rules` array** | **Rules-only**; do not add lectures, problems, MCQs, flashcards or other material arrays. An optional `coverage` object may document batches. |
| `bsa-financial-statements-v1` | `company`, `periodEnd`, `currency`, `unit`, `source`, `statements`, `notes`, `standards` | Financial Statements Lab. Not a Topic Pack, not a rulebook. |

Typed single-material imports must not contain another material's nonempty array. A Topic Pack is the explicit exception. For typed rules, the rulebook importer accepts up to **100 rules per import**; generate complete source coverage in numbered batches rather than cutting off a standard after five or inventing five rules.

## C. Required structures and quality

### Topic Pack (`bsa-topic-pack-v1`)

Use a consistent subject and actual chapter/topic name. Within `lectures`, each item needs a title, topic, source, and `sections` containing `heading`/`body` (the importer also understands lecture-section `h`/`body` in typed lecture imports). Written and MCQ items must preserve the **full original question**, data, requirements, verified answer, and worked solution. Flashcards should each test a distinct retrieval target. Rules must include title, decisionRule, topic, and supported citations. Set unused arrays to `[]`; do not pad with fabricated material. The dashboard checks repeats and conflicts again before saving.

### Rulebook (`bsa-rulebook-v1`)

Use exactly one `rules` array. Each record requires `title` and `decisionRule`. Recommended fields: `collection`, unique `code`, `topic`, `category`, `conditions`, `treatment`, `exceptions`, `example`, `examTrap`, `sourceTitle`, `sourceLocator`, `sourceUrl`, `status`, `notes`. Use the SAME `collection` for all rules belonging to one standard (e.g., PAS 10), and unique codes within it (e.g., `PAS 10-01`, `PAS 10-02`). For another course use a named grouping such as `Corporate Bonds` or `Modular Arithmetic`; do not force accounting labels.

Allowed `status`: `Source checked`, `Needs verification`, `Personal note`. Only say `Source checked` if the actual cited passage was inspected and its title plus specific section/page or real HTTPS URL are known. The app can check the presence of a citation field but **cannot verify the claim** itself. If content is not verifiable, omit it or mark `Needs verification` without fabricated citations.

For complete standards coverage, organize by meaningful source sections, include treatments and exceptions, then continue in **numbered batches** (usually up to 20 substantial cards per response for robust JSON). This is a response-size suggestion, **not a cap on the number of rules**. Stable rule IDs/codes must not repeat between batches. Optional `coverage` object may contain `collection`, `batch`, `coveredSections`, `remainingSections`, and `hasMore`.

### Financial Statements (`bsa-financial-statements-v1`)

Preserve the *reported* structure and ordering: Statement of Financial Position (assets, liabilities and equity with current/noncurrent groupings where printed); Statement of Profit or Loss and OCI if provided; Statement of Cash Flows (operating/investing/financing, including cash reconciliation); Statement of Changes in Equity; and relevant disclosures. Use each statement's `type`, `title`, `page`, and `lines` where each line includes `kind` (`section`, `item`, `subtotal`, `total`), `label`, numeric `amount`, numeric `comparative` where printed, `note`, and `indent` where appropriate. Use `null` for illegible or missing figures (not zero). Preserve negative figures, dates, unit scale, currency, exact subtotal identities and note references. Do **not** fabricate a statement or infer amounts/standards that are absent from the source.

Do not interpret a displayed reconciliation check as an audit or a statement that the financial report complies with a standard. The source PDF remains authoritative.

## D. Student-focused output

For ordinary chat, use concise, friendly teaching—not machine JSON. Explain simply before introducing formal vocabulary. In practice mode, ask one question at a time and let the learner attempt it before showing the full answer unless they request it. Provide corrective feedback and a short teach-back/check when useful. Avoid imposing accounting tools or journal entries on Finance, History, Math, or other subjects where they are irrelevant.

## E. Import workflow and safety

1. Choose the **correct subject** in the dashboard.
2. Attach the actual source material and this MD file to the AI; choose one relevant prompt from **Study Library → Import Center**.
3. Generate valid JSON; locally check the JSON syntax and compare figures and wording against the original source.
4. For study materials, go to **Study Library → Bulk import / Topic Packs**; for published financial statements go to **Financial Statements → Reports & import**.
5. Review the dashboard's duplicate/conflict preview and manually inspect ambiguous variants. Save only when satisfied. Preserve backups before major imports.

See `BSA_AI_PROMPT.md` for the separate interactive tutoring behavior and `EXAMPLE-universal-rulebook.json` for the illustrative rulebook schema. **Do not import the example as academic content without replacing and verifying it.**
