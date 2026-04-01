export const guideHighlights = [
  "A practical mental model for using AI without surrendering judgment.",
  "A clear Automate / Assist / Protect framework for real business workflows.",
  "Six high-leverage prompts that sound like strategy instead of AI theater.",
  "A one-week implementation plan that creates lift without creating mess.",
] as const;

export const leverageStrengths = [
  "Getting unstuck faster when rough thinking needs structure.",
  "Turning notes, transcripts, and voice dumps into usable documents.",
  "Generating alternatives quickly before human judgment narrows the field.",
  "Summarizing complexity so decisions become clearer sooner.",
  "Cleaning up repetitive communication without rebuilding the whole process.",
] as const;

export const leverageRisks = [
  "It defaults toward familiar, average language unless you force specificity.",
  "It can be confidently wrong, especially when it has not been given enough context.",
  "It lacks the lived judgment required for trust-heavy communication.",
  "It often sounds polished before it becomes commercially useful.",
  "Used lazily, it dilutes the exact voice and standards that made the business distinct.",
] as const;

export const frameworkBuckets = [
  {
    key: "automate",
    title: "Automate",
    summary: "Use AI where repetition is high, nuance is low, and light editing is enough.",
    examples: [
      "meeting summaries",
      "first-draft follow-up emails",
      "proposal outlines",
      "intake questionnaires",
      "task extraction from notes",
      "internal SOP drafts",
    ],
    goodLooksLike: "Less backlog, cleaner first drafts, and lower mental friction with minimal downside.",
  },
  {
    key: "assist",
    title: "Assist",
    summary: "Use AI to create momentum, then let the human shape the final quality.",
    examples: [
      "website copy",
      "sales emails",
      "client proposals",
      "positioning work",
      "workshop outlines",
      "content repurposing",
    ],
    goodLooksLike: "The work still sounds like you, but it gets to quality much faster.",
  },
  {
    key: "protect",
    title: "Protect",
    summary: "Keep the most trust-heavy, consequence-heavy, and judgment-heavy moments human-led.",
    examples: [
      "negotiations",
      "pricing decisions",
      "conflict resolution",
      "relationship repair",
      "legal or financial communications",
      "brand-defining voice calls",
    ],
    goodLooksLike: "AI may support prep behind the scenes, but the actual call stays human.",
  },
] as const;

export const decisionQuestions = [
  "Is this repetitive?",
  "Is this high-stakes?",
  "Does this require trust?",
  "Does this require taste or judgment?",
  "Would I be comfortable if this came back slightly wrong?",
] as const;

export const promptTemplates = [
  {
    key: "follow-up-email",
    title: "Write a follow-up email that creates momentum without sounding processed",
    useCase: "For meetings, events, referrals, or sales conversations where tone matters.",
    summary: "Give the model business context, relationship context, constraints, and a real quality bar.",
    body: `Act as a sharp business development strategist and excellent email writer.

Your job is to help me write a follow-up email that feels human, attentive, specific, and commercially effective without sounding pushy or artificial.

## Business context
- My business: [describe business in 1–3 sentences]
- What we sell: [offer / service / product]
- Typical customer: [describe who buys and why]
- What makes us different: [key differentiators]
- My natural voice: [plainspoken / warm / premium / direct / local / witty / calm]

## Relationship context
- I met this person at: [event / meeting / referral / networking context]
- Their role / business: [details]
- What we discussed: [bullet points]
- What they seemed to care about most: [speed / trust / pricing / growth / quality / ease / certainty]
- The opportunity I see: [describe it clearly]
- The next step I want: [book call / send proposal / continue discussion / intro to team member]

## Task
Write 3 versions of a follow-up email.

## Constraints
- Each email should be under 160 words
- It must sound natural and thoughtful, not like a generic sales sequence
- Mention one specific detail from our conversation so it feels real
- Avoid clichés like:
  - "hope you're well"
  - "just following up"
  - "touching base"
  - "circling back"
- Avoid corporate filler and fake enthusiasm
- End with a clear, low-friction call to action
- Make the recipient feel understood, not processed

## Quality bar
I want this to sound like it came from a sharp, grounded business owner who pays attention, respects the other person's time, and knows how to create momentum without pressure.

## Output format
For each version, provide:
1. Subject line
2. Email body
3. Why this version works

Then do all of the following:
- Tell me which version is strongest and why
- Highlight 5 phrases I should personalize before sending
- Give me 3 optional closing lines with different tones:
  - more direct
  - more warm
  - more premium
- Finally, give me a version that is 20% shorter and more conversational`,
  },
  {
    key: "website-copy",
    title: "Rewrite website copy so it sounds clearer, more specific, and more premium",
    useCase: "For owners whose website still sounds vague, generic, or too polished to be persuasive.",
    summary: "Push the model toward clarity, specificity, and believable language instead of startup filler.",
    body: `Act as an elite copywriter with strong strategic judgment, excellent taste, and zero patience for vague marketing language.

Your job is to rewrite my website copy so it is clearer, more persuasive, more specific, and more believable while preserving what is true.

## Business context
- My business: [describe business]
- What we do: [services / offer]
- Ideal client: [describe them]
- What they care about most: [trust / speed / results / quality / simplicity / expertise / price]
- Main pain points they have before hiring us: [list]
- Main outcome they want: [list]
- What makes us different: [list]
- My brand voice should feel: [plainspoken / sophisticated / practical / warm / authoritative / local / intelligent]
- Words / phrases I never want to use: [list]

## Source copy
[Paste the current copy here]

## Task
Rewrite this copy so a strong prospect immediately understands:
- what we do
- who it is for
- why it matters
- why they should trust us
- what to do next

## Constraints
- Do not invent credentials, proof, or testimonials
- Remove fluff, vagueness, abstraction, and cliché language
- Use plain English
- Prioritize specificity over polish
- Make the writing feel human and grounded
- Keep the strongest real ideas, but make them more compelling
- Avoid sounding like a generic agency website

## Output format
Give me:

### Version A — Clear and direct
Write for clarity, trust, and immediate understanding.

### Version B — Premium and confident
Write for a more elevated, high-end feel without becoming pretentious.

### Version C — Warm and approachable
Write in a more relational, natural tone.

Then provide:
- 5 homepage headline options
- 5 subheadline options
- 3 CTA button options
- A section called "Lines That Still Sound Generic" where you identify weak wording and explain why it weakens trust
- A section called "Where Human Specificity Should Be Added" listing the spots where I should insert real examples, proof, process details, or language from actual clients`,
  },
  {
    key: "workflow-triage",
    title: "Sort workflows into automate now, assist carefully, or keep fully human",
    useCase: "For deciding where AI actually belongs in a real business.",
    summary: "This is the decision prompt that turns hype into an implementation map.",
    body: `Act as an operations strategist for a small business that wants practical AI leverage, not gimmicks.

Your job is to help me evaluate my workflows and identify where AI can create immediate value without damaging trust, quality, or judgment.

## Business context
- Business type: [type]
- Team size: [size]
- Revenue model: [optional]
- Average client value: [optional]
- Current capacity problems: [list]
- Recurring bottlenecks: [list]
- Tasks that repeatedly get delayed: [list]
- Tasks that only I can do well right now: [list]
- Biggest operational frustrations: [list]

## Task
Sort the following workflows into 3 categories:
1. Automate now
2. AI-assisted but human-reviewed
3. Keep fully human

Workflows to evaluate:
[Paste list]

## Evaluation criteria
For each workflow, tell me:
- which category it belongs in
- why it belongs there
- what the upside of using AI would be
- what the biggest risk would be
- what a smart low-risk first test would look like this week
- how I would know if the test worked

## Constraints
- Be practical, not futuristic
- Prioritize fast wins
- Do not recommend overly complex systems unless they are clearly justified
- Flag anything that could weaken client trust, decision quality, or brand perception
- Assume I want immediate business usefulness, not a science experiment

## Final output
After sorting everything, give me:
- the top 5 AI opportunities by likely ROI over the next 30 days
- the easiest win
- the highest-value win
- the biggest avoidable mistake
- a 7-day implementation sequence in priority order`,
  },
  {
    key: "proposal-draft",
    title: "Turn rough call notes into a proposal draft that feels credible and premium",
    useCase: "For owners who know the solution but lose time translating messy notes into structured proposals.",
    summary: "Strong proposal prompts reduce blank-page drag without flattening your judgment.",
    body: `Act as a senior proposal writer and business strategist.

Your job is to turn rough notes into a clear, persuasive proposal draft that makes the client feel understood, builds confidence, and creates momentum.

## Business context
- My business: [describe]
- What I do best: [list]
- My tone should feel: [clear / professional / premium / warm / practical]

## Client context
- Client / company: [details]
- Their situation: [details]
- Their current pain points: [list]
- Their desired outcome: [list]
- Urgency / timing: [details]
- Any objections or sensitivities: [details]

## Solution context
- My proposed solution: [details]
- Scope notes: [details]
- Deliverables: [details]
- Timeline: [details]
- Pricing notes: [details]
- Unknowns / things not yet decided: [details]

## Raw notes
[Paste your raw notes here]

## Task
Turn these notes into a proposal first draft with the following sections:
1. Executive summary
2. Current challenge
3. Recommended solution
4. Scope of work
5. Expected outcomes
6. Timeline / phases
7. Investment
8. Next steps

## Constraints
- Make it specific and credible
- Avoid hype, inflated promises, or generic consultant language
- Use plain but confident language
- Make the client feel understood
- Do not invent facts
- Keep it commercially strong without sounding slick or manipulative

## Then do all of the following
- Identify where I still need to apply my judgment before sending
- Point out anything that sounds generic or weak
- Suggest 3 ways to make the proposal feel more premium
- Suggest 3 questions I should answer before finalizing the proposal
- Rewrite the executive summary one more time in a tighter, sharper version`,
  },
  {
    key: "ruthless-editor",
    title: "Use AI as a ruthless editor instead of a ghostwriter",
    useCase: "For keeping your own voice alive while improving clarity and persuasion.",
    summary: "This prompt treats AI like an unsentimental editor, not a content vending machine.",
    body: `Act as a brutally honest editor with excellent taste, a strong ear for natural language, and high standards for clarity and persuasion.

Your job is not to flatter me. Your job is to help me improve this draft without sanding off its personality.

## My context
- Audience: [describe audience]
- Goal of this piece: [goal]
- Desired tone: [tone]
- What I want the reader to think / feel / do after reading: [details]

## Draft
[Paste draft here]

## Task
Do NOT rewrite this immediately.

First, critique it using the following categories:
- What is strong
- What is unclear
- What is generic
- What is too formal
- What is weak or forgettable
- What creates friction for the reader
- What sounds unlike a real human
- Where the emotional energy drops
- Which lines are worth preserving

Then:
- Give me the 5 highest-impact edits in order
- Explain what each edit would improve
- Rewrite the piece while preserving my intent and voice

## Constraints
- Do not turn this into generic AI copy
- Prefer specificity over polish
- Keep what is alive and distinctive
- Remove what is vague, padded, or performative
- If a sentence sounds like "business content," kill it

## Final step
Give me:
- a cleaner second draft
- 3 alternative opening lines
- 3 stronger closing lines
- a short list called "Places to Add Real-World Detail"`,
  },
  {
    key: "strategy-memo",
    title: "Turn a messy brain dump into useful strategy",
    useCase: "For founders working through ambiguity who need structure without losing nuance.",
    summary: "This prompt is strongest when the owner already has good instincts but needs clarity under pressure.",
    body: `Act as a strategic thinking partner for a business owner.

Your job is to take my messy thoughts and turn them into a clear, useful strategic document without flattening the nuance.

## Context
- My business / project: [describe]
- The decision or opportunity I am working through: [describe]
- What feels unclear right now: [list]
- What matters most: [list]
- Constraints: [time / money / staffing / risk / market realities]

## Brain dump
[Paste notes, transcript, or rough thinking here]

## Task
Turn this into a structured strategic memo with these sections:
1. What I am really trying to solve
2. What appears to matter most
3. Key assumptions I am making
4. Risks / blind spots
5. Options available
6. Best next steps
7. Questions I still need to answer

## Constraints
- Preserve nuance
- Do not oversimplify tradeoffs
- Separate facts from assumptions
- Flag places where more evidence is needed
- Be concrete and commercially useful

## Then do all of the following
- summarize the real decision in one sentence
- tell me what I may be underestimating
- tell me what I may be overcomplicating
- suggest the next 3 smartest moves`,
  },
] as const;

export const implementationDays = [
  {
    day: "Day 1",
    title: "Choose one recurring friction point",
    body: "Pick the task that is annoying, recurring, valuable enough to matter, and safe enough to experiment on without reputation risk.",
  },
  {
    day: "Day 2",
    title: "Give the model real context",
    body: "Explain the audience, the desired outcome, your tone, what must remain true, and what should never happen.",
  },
  {
    day: "Day 3",
    title: "Edit aggressively",
    body: "Cut generic wording, restore specificity, verify facts, and remove anything you would not actually say.",
  },
  {
    day: "Day 4",
    title: "Use AI recursively",
    body: "Ask it to critique its own output, shorten it, strengthen it, surface objections, and identify what still sounds generic.",
  },
  {
    day: "Day 5",
    title: "Evaluate honestly",
    body: "Measure whether the workflow saved time, reduced friction, improved clarity, and preserved trust. Keep only what earns its place.",
  },
] as const;

export const implementationMistakes = [
  "Giving vague instructions and then blaming the model for vague output.",
  "Sending the first draft untouched and letting the business sound generic.",
  "Using AI in trust-heavy moments without review.",
  "Confusing polished language with accurate thinking.",
  "Automating before clarifying the process itself.",
  "Letting AI flatten the differentiators that made the business strong.",
  "Trying to implement ten workflows before one workflow actually works.",
] as const;

export const pullQuotes = [
  "Use AI for speed. Use yourself for standards.",
  "You are the editor, not the audience.",
  "The future belongs to people who use AI with discernment.",
] as const;
