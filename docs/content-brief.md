# Content brief

Single source of truth for all site copy. Threads must not invent facts: anything marked `TODO` stays a placeholder.

Source tags: **(CV)** resume, **(LI)** LinkedIn profile/posts, **(vault)** Kushal's resume fact vault, **(notes)** things he told Claude earlier, **(approved)** copy he approved, **(decided)** choices Claude made on Kushal's behalf after he delegated them on 2026-10-19 ("do whatever is in my best interest"); he can overturn any of them.

## Identity
- Name: Kushal Jayavarapu
- Site name / wordmark: **KJ** (approved)
- Location: Bengaluru, Karnataka, India
- LinkedIn: https://www.linkedin.com/in/kushaljayavarapu/ · GitHub: https://github.com/KushalJayavarapu
- Public email: kushalval2006@gmail.com (approved). Implementation: never expose it as a plain-text `mailto:` in the HTML source; use a small JS reveal or encoded link to reduce scraping.
- Phone: do NOT show anywhere.
- Spoken languages: English, Hindi (professional working proficiency) (vault)
- Resume: TODO (needs a file from Kushal). Do NOT publish the current CV PDF as-is (it contains a phone number and CGPA and is dated mid-July). A cleaned version without phone, CGPA or SRN goes in `public/resume.pdf`. Until it exists, the "Resume" button stays hidden (decided).

## One-line positioning (approved)
"Computer science student building AI and data systems, from LLM-agent robustness research to hackathon prototypes."

## Short bio (approved)
I'm a Computer Science undergraduate at PES University in Bengaluru, building AI and data products. I did summer research at PES University's Center for Cloud Computing and Big Data, and I work on benchmarks for how LLM agents hold up when their environment changes. Outside coursework I build hackathon projects, lead club operations, and write a weekly AI explainer series. I'm aiming for forward-deployed engineering roles, with a side interest in finance and data analytics.

## Typing-line phrases (approved; hero animation)
- "builds AI systems that hold up under change."
- "turns hackathon ideas into working prototypes."
- "writes weekly about AI in plain words."
- "studies how LLM agents adapt."

## Calls to action (approved)
- Primary: "See my projects" · Secondary: "Get in touch"

## Target roles
- Forward deployed engineer; also exploring finance x data analytics (notes).

## Experience (most recent first)
- **Summer Research Intern, Center for Cloud Computing and Big Data (CCBD), PES University.** Jun 2026 - Jul 2026 (6-week internship, on-site, Bengaluru). Project: "AdaptBank: A Unified Evaluation Framework for Environmental Robustness of AI Agents" (vault).
  - Evaluated agent robustness under Semantic Drift by running the ToolMisuseBench suite, one of four drift dimensions in the AdaptBank taxonomy.
  - Computed Robustness Score, Recovery Performance Score and Context Adaptation Time; benchmarked 6 agents (including 2 frontier models) across all three metrics.
  - Contributed cross-agent scoring to a standardized Environmental Robustness Score meant to power an agent leaderboard. (CV says "public", but no leaderboard URL is on record, so the site must NOT call it public or live. Use "meant to power an agent leaderboard" (decided). TODO: switch wording only once a URL exists.)
  - Extended coverage to further drift suites (OpenApps, WebArena, tau-bench) spanning Interface, Workflow and Policy drift.
  - Also: visited the Bharat Electronics Limited Central Research Laboratory; attended a Tech Talk Series on agentic AI, LLMs and data-centre technology.
- **Event Manager** (part-time), G Cube. Feb 2026 - present. Designed the format, schedule and map-selection framework for a campus Valorant tournament (40 teams) and led its promotion (vault, CV).
- **Core Member** (leadership team), Center for Information Security, Forensics and Cyber Resilience (ISFCR), PES University. Jan 2026 - present. Partners with the Club Head to coordinate cross-functional teams, allocate tasks, and lead member recruitment and onboarding (vault, CV).
- **Head of Content and Media**, ISFCR. Sep 2025 - Jan 2026. Directed content strategy and production, including Instagram reels, for CRYOVAULT, the club's flagship CTF (60 teams from across India). Shot and edited live story coverage during the event, which a senior faculty member praised. Also did candidate interviewing and public speaking (vault).
- **Core Member**, ISFCR. Aug 2025 - Sep 2025 (earlier stint).
- **Computer Vision Trainee**, PESU I/O, PES University. Sep 2024 - Nov 2024.

- Not listed: LinkedIn's "Management Trainee, Google". It is not on the CV and is most likely the PM certificate filed as a role; leave it off (decided). The certificate stays under Certifications.

## Projects

### ATTEST (featured)
Turns any written assignment into a short, adaptive oral defense. Instead of detecting whether AI wrote an essay (unreliable, defeated by light paraphrasing), it asks whether the student can defend what they submitted. Built with Santosh Cheethirala for the OpenAI Buildathon (team of 2); Kushal's first time with voice agents and OpenAI APIs.
- **How it works (vault):** a lightweight editor logs every keystroke, pause and paste as an append-only event log; replaying it reconstructs how each part was written (computed deterministically, not inferred); GPT-5.6 reads the essay plus provenance and finds the claim the writer is least able to defend; an examiner probes that claim in a live voice conversation over WebRTC (OpenAI Realtime API); if a gap appears it switches to Socratic teaching until the student can defend the point, then re-checks. Teacher tooling rewrites assignments to resist AI shortcuts, generates a defense rubric, and shows a class-level map of understanding.
- **Kushal's role (vault):** co-developer alongside Santosh, the framework originator. His work: database persistence, API hardening, rate limiting, classroom/student management, teacher-student workflows, seam caching, Playwright E2E testing.
- **Technical highlights:** dependency-free token-bucket rate limiter; one shared "examiner core" serving Realtime audio, browser speech and text through thin adapters; deterministic evidence (paste detection, revision counts) kept separate from LLM judgment; no-credentials demo mode with a deterministic examiner; 60 unit tests (Vitest) plus Playwright E2E; debugged live-only issues (a tool-schema field valid for the Responses API but rejected by the Realtime API silently killed voice sessions).
- **Stack:** Next.js 16 (App Router), TypeScript, React, Tailwind CSS, Vercel, GPT-5.6 (Responses API), OpenAI Realtime API (WebRTC), Web Speech API, Neon serverless Postgres, Vitest, Playwright.
- **Links (decided):** link both: repo https://github.com/santoshcheethiralame-dot/ATTEST (label it as Santosh's repo) and live demo https://attest-one.vercel.app. The implementing thread must check both still load at build time; drop any that doesn't.
- **Outcome:** omit from the site (decided). Background only: the Buildathon had 46,700+ team participations and 8 projects selected; ATTEST was not selected (LI post).

### AdaptBank (featured)
Evaluation framework for how LLM agents behave when their environment changes (an app or website updates and agents break). Covers 4 drift types (Semantic, Interface, Workflow, Policy) and 3 metrics (Robustness Score, Recovery Performance Score, Context Adaptation Time). Goal: let a developer choosing an agent compare numbers and see which will hold up. Built during the CCBD internship, still continuing informally with the team toward a research publication (vault).
- Anecdote (optional): the biggest obstacle was API rate limits; he generated 10-15 API keys to get through one benchmarking run.
- **Paper status: awaiting publication approval.** Never claim acceptance, a venue, or "published".
- Credits (decided: show; he tagged them publicly in his LinkedIn post): teammates Nikhil Sai Madala, Brinda S, Manasa Bhaktha S; mentor Priya Badrinath; Centre Director Dr. Shylaja S S. Names only, no contact details.
- TODO: repo / leaderboard / paper link when allowed.


### EcoSphere (featured)
ESG Management Platform built end-to-end by a 4-person team in an 8-hour hackathon (Odoo hackathon, Feb 2026). Stack: FastAPI, React/TypeScript, PostgreSQL, SQLAlchemy, Alembic. Kushal led schema design and team coordination, directed the Git workflow and repo structure, and guided the React frontend. Delivered carbon tracking, XP/badge challenge gamification, policy acknowledgement, an ESG simulator and cross-department reporting, with role-based dashboards for employees, managers and ESG managers (CV, vault).
- Repo: https://github.com/KushalJayavarapu/EcoSphere
- Outcome: omit from the site (decided). Background only: the team did not advance to the offline round (LI post).

### HustleHub (not featured)
CIE Spark 2025 (CIE, PES University): Top 13 finalists of 77 teams. 3rd-semester project with a 4-person team. Identified and validated the "Golden Hour" response gap after road accidents; conducted 60+ customer interviews across multiple states (commuters, parents, long-distance drivers); proposed a sensor-based IoT accident detection and emergency alert system (vault). Teammates' names: do not list.

### Other (not featured)
- **`/storm-research` Claude Code command** (notes): replicates Stanford's STORM research pipeline using only Claude Code's built-in search and reasoning, no extra API keys. Not on the Projects page until a public repo link exists (decided). TODO: repo link.

### Candidate projects: do NOT list until Kushal confirms what happened
No source records what he built or achieved for these, so there is nothing factual to write yet (decided: keep hidden).
- **RetinaLens** (Smart India Hackathon 2026, SIH26038): explainable-AI diabetic retinopathy screening pipeline in MATLAB. Outcome: TODO.
- **Bearing-fault copilot** (AMD Developer Hackathon ACT III, Oct 2026): repo `KushalJayavarapu/bearing-fault-copilot`. Outcome: TODO.
- **Amazon ML Challenge 2026** (Business Entity Resolution): Outcome: TODO.
- **GreenPay** (iQOO hackathon): did not pass the idea round (LI post). Skip unless used as a "lessons" story.

## Achievements (exact wording)
- **Winner, AI Hackathon, IISc Bengaluru Workshop** (organized by Techgyan Technologies, 2025): built a machine-learning model to detect ambulance sirens, with applications in automated traffic management and emergency response. Team of 4. (Model accuracy is not on record; do not state a metric.)
- **CIE Spark 2025:** Top 13 of 77 teams (HustleHub).
- **Adobe hackathon (team of 3):** include as "Top 9% of 3 lakh+ participants, coding round" (decided). Do not imply he went further; he did not clear the later case-study round (LI post).
- TODO: any others.

### Workshops and activities (low priority; for an About page or timeline)
- LLM Architecture & BERT Fine-Tuning Workshop, PES University (Encode.ai): LLM architecture, pre-training and fine-tuning.
- Engenious '25 Ideathon, Enactus PES University: 12-hour team ideation challenge.
- PeCon 2024 (PES MUN Society): represented Lebanon. Diplomat Wars 5.0 (PES MUN Society): quiz, debate and courtroom rounds.

## Hackathon record and lessons (source for a possible blog post)
From his LinkedIn post "Four hackathons. One month. Four different teams. Zero wins": OpenAI Buildathon (ATTEST), Adobe (top 9% after the coding round), iQOO (stopped at the idea round), Odoo (EcoSphere, no offline round). Takeaways he stated: rushed ideas lack depth; too long in planning at Odoo; gaps in full-stack decision speed; stepping back to fundamentals, personal ML projects, and comparing open-source models. Suggested title: "Four hackathons, zero wins: what I learned". Decided: not the first post (it leads with four losses); fine as a later post.

## Education
- **PES University**, B.Tech in Computer Science & Engineering, 2024 - 2028. Do NOT show GPA/CGPA anywhere. Relevant courses (notes): DBMS, Machine Learning, Software Engineering, Data Analytics, Graph Theory.
- **NxtWave x Woolf University**, DSA & Full-Stack Development (CCBP 4.0), 2025 - 2027.
- (Third LinkedIn entry is Sanghamitra School with no dates: do not show.)

## Certifications (no credential IDs on the site)
- **Google Project Management Professional Certificate** (Google, via Coursera), Apr - Oct 2025. 140-hour program: Agile/Scrum, stakeholder communication, risk management, documentation, real-world project simulations. Took it out of interest beyond his technical field.
- **Introduction to Programming Using Python**, 2024. Show without an issuer (decided). TODO: CV and vault say Coursera; LinkedIn shows HackerRank (Dec 2024); possibly two certificates.
- LinkedIn lists a third certification that no source here names: leave it off (decided). TODO: name it if Kushal wants it shown.

## Skills (from the vault; only what is evidenced)
- **Languages:** Python, TypeScript, C, C++ (DSA-focused), ARM Assembly
- **AI / agent evaluation:** agent robustness evaluation, LLM benchmarking, drift taxonomy analysis (Semantic, Interface, Workflow, Policy), tool-schema design for LLM APIs (OpenAI Responses/Realtime)
- **Realtime / voice:** OpenAI Realtime API (WebRTC), Web Speech API
- **Frameworks & libraries:** FastAPI, SQLAlchemy, Alembic, React, Next.js 16 (App Router), Tailwind CSS
- **Tools & infrastructure:** Git, Docker, PostgreSQL, Claude Code, Jira, Notion, ClickUp, Vercel, Neon serverless Postgres, Vitest, Playwright
- **Core CS:** Data Structures & Algorithms, Operating Systems, Computer Networks, Software Engineering
- **Other:** project-management fundamentals (Google PM certificate), computer vision basics, customer discovery (60+ structured user interviews)

## Writing
- Runs **The Footnote**, a weekly AI series on LinkedIn (carousel + caption), published Tuesdays; plain-language, minimal jargon (notes). Decided: link out to LinkedIn, not republish (carousels don't translate to the site and would need weekly upkeep). Writing page gets a short "The Footnote" block with a one-line description and a follow link. TODO: per-issue links if Kushal wants a "latest issues" list.
- First post (decided): (2) the CCBD agent-robustness research post. It is the most distinctive and fits the forward-deployed angle. The post itself must be written from Kushal's own account; don't draft facts beyond this brief. Other candidates: (1) "Four hackathons, zero wins"; (2) what I learned doing agent-robustness research at CCBD (starting with no research background, rate-limit chaos, getting comfortable with uncertainty); (3) what the Google PM course taught me about unpredictable projects

## Things NOT to include
- GPA/CGPA, phone number, student ID/SRN, age, hostel/living situation, health or fitness info, credential IDs, other people's contact details, unannounced results, any claim that AdaptBank is accepted or published.
- Teammates and mentors are named only if Kushal approves.
- Hackathon non-results (ATTEST, EcoSphere, iQOO) on project cards; they live only in a possible blog post.
- TODO: anything else.

## Still needs Kushal (facts only he has)
- Cleaned résumé PDF.
- AdaptBank leaderboard URL, if it is public.
- What happened with RetinaLens, Bearing-fault copilot and the Amazon ML Challenge.
- Python certificate issuer, and the third LinkedIn certification.
- `/storm-research` repo link.
