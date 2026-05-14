# Figma ↔ Copilot ↔ GitHub — End-to-End SDLC Demo Plan

**Format**: Live screenshare presentation  
**Story**: Designer builds a Services page in Figma → Developer uses Copilot to generate code → Copilot generates tests → push to GitHub → CI auto-runs → iterate → close the loop back to Figma  
**Web site**: Tooth Talk (dental professionals community — existing `aboutus.html` is the anchor)  
**New page**: `services.html` — Tooth Talk Services page  
**Tech stack**: Plain HTML + CSS + JS (no frameworks)  
**Figma → Code tool**: Framelink MCP (`figma-developer-mcp`)  
**Code → Figma tool**: html.to.design Figma plugin  
**CI/CD**: GitHub Actions (Playwright tests)  
**Duration**: ~30–35 minutes live

---

## Phase 0 — Pre-Demo Setup *(done before audience arrives)*

### Tools & Accounts
1. **GitHub CLI installed** — `gh --version` should work in terminal. Used to create the repo live.
2. **GitHub account authenticated** — run `gh auth status` to confirm.
3. **Node.js + npx** — `node --version` and `npx --version` should respond.
4. **VS Code Live Server extension** — installed for one-click local serving.
5. **Figma account** — html.to.design plugin installed from Figma Community.

### MCP & Figma
6. **Figma file ready** — Services page frame designed and named (see Figma setup below).
7. **MCP server verified** — open VS Code, confirm Framelink MCP shows **running** in Copilot sidebar.
8. **Frame link copied** — right-click the Services frame in Figma → Copy/Paste as → **Copy link to selection**.

### Local workspace
9. **`npm install`** — run once in the workspace folder to install Playwright.
10. **`npx playwright install --with-deps chromium`** — installs Playwright browser binary.
11. Confirm `npx playwright test` passes locally against the reference `services.html`.
12. **Browser pre-arranged** — VS Code on the left, Figma + browser tabs ready on the right (or second monitor).

---

### Figma File Setup (if not already done)
Create a new frame in Figma called **"Services Page"** with:
- A **hero** section: brand background (`#843E71`), `h1` heading, subtitle `p`.
- A **services grid**: 6 cards (General Dentistry, Orthodontics, Cosmetic Dentistry, Periodontics, Oral Surgery, Paediatric Dentistry). Each card: icon placeholder, title, description.
- A **"What to Expect"** section: 3 numbered steps (Book, Meet, Leave Smiling).
- A **CTA** section at bottom on brand background.
- A sticky **nav bar** with the Tooth Talk logo, nav links, "Register Now" CTA.
- Use Auto Layout and named layers so Copilot can read them clearly.

---

## Phase 1 — Set the Scene *(live, ~5 min)*

13. **Show the existing website** — right-click `aboutus.html` → Open with Live Server.  
    Narrate: *"Last time we showed basic Figma → VS Code integration. Today we're showing the full SDLC loop — from design to deployed, CI-verified code."*
14. **Switch to Figma** — show the Services page frame the designer has now completed.  
    Call out: named layers, design tokens, component structure, Auto Layout.
15. **Narrate the old way**: designer exports assets, writes Figma Dev Mode specs, developer re-implements manually.

> **Key message**: *The handoff is broken — designer and developer work in silos. Today we fix that.*

---

## Phase 2 — Figma → Copilot → Code *(live, ~8 min)*

16. Switch to VS Code. Open Copilot Agent mode (`Ctrl+Alt+I`), ensure model is set to **GPT-4o** or **Claude Sonnet**.
17. Paste the Figma Services frame link. Use this exact prompt:
    > *"Using the Figma frame at [PASTE URL], generate `services.html` with embedded CSS and vanilla JS. Reuse the CSS custom properties already defined in `aboutus.html` for brand consistency. Match the layout and design exactly."*
18. **Watch it work** — point to the `get_figma_data` tool call in the log. Narrate: *"Copilot is reading the real design data from Figma — not a screenshot, not a description."*
19. `services.html` appears. Right-click → **Open with Live Server**.
20. **Side-by-side** — Figma design on the right, live browser render on the left. Narrate colour, spacing, typography fidelity.

> **Key message**: *Copilot reads Figma natively via MCP. No copy-pasting specs.*

---

## Phase 3 — Automated Test Generation *(live, ~5 min)*

21. Copilot Agent prompt:
    > *"Generate a Playwright test file `tests/services.spec.js` that tests: the hero heading is visible, all 6 service cards render, and the bottom CTA button is present."*
22. Show the generated `tests/services.spec.js` — narrate what each test checks.
23. In the VS Code terminal, run:
    ```bash
    npx playwright test --headed
    ```
24. Browser opens, tests run, green ticks. Narrate: *"Copilot didn't just write the page — it wrote proof that the page works."*

> **Key message**: *Testing is part of the same AI-assisted loop, not an afterthought.*

---

## Phase 4 — Create GitHub Repo & Push *(live, ~5 min)*

25. In the VS Code terminal:
    ```bash
    git init
    git add .
    git commit -m "feat: services page generated from Figma handoff + Playwright tests"
    gh repo create cs-tooth-talk-live --public --source=. --remote=origin --push
    ```
26. Open the new repo on GitHub in the browser. Show all files have landed — and `.env` is **not there** (excluded by `.gitignore`).
27. Point out `.github/workflows/ci.yml` is in the repo.

> **Key message**: *From Figma design to code in a GitHub repo in under 15 minutes.*

---

## Phase 5 — GitHub Actions CI Triggers *(live, ~5 min)*

28. Navigate to the **Actions** tab on the new GitHub repo.
29. Watch the CI workflow run — triggered automatically by the push.
30. Drill into the workflow: **Checkout → Install Node → Install Playwright → Run Tests**.
31. All tests pass. Green check mark.
32. Point out: every future push will automatically validate the code against the design-driven tests.

> **Key message**: *The design handoff didn't just produce a page — it produced a verified, CI-gated delivery.*

---

## Phase 6 — Iterative Feedback Loop *(live, ~7 min)*

33. "Stakeholder says: we need a **'Book Appointment'** button right in the hero section."
34. Copilot Agent prompt:
    > *"Add a prominent 'Book Appointment' button to the hero section of `services.html`. Use `var(--brand)` background with white text, same style as the existing `.btn-primary` class. Place it below the hero subtitle."*
35. Reload browser — show the hero button appearing.
36. Update the test — Copilot prompt:
    > *"Update `tests/services.spec.js` to also assert that the 'Book Appointment' button is visible inside the hero section."*
37. Run `npx playwright test` again — still green.
38. Push the iteration:
    ```bash
    git add services.html tests/services.spec.js
    git commit -m "feat: add Book Appointment CTA in hero (stakeholder feedback)"
    git push
    ```
39. Back to GitHub Actions — CI re-triggers and passes again.

> **Key message**: *Stakeholder feedback → design change → code change → CI green, in minutes.*

---

## Phase 7 — Code → Figma (Close the Loop) *(live, ~5 min)*

40. In Figma, open the **html.to.design** plugin (Plugins → html.to.design).
41. Paste `http://localhost:5500/services.html` and click Import.
42. Import completes — show **fully editable layers** in Figma. Move a component, change a colour — it's live Figma objects, not a flat screenshot.
43. Narrate: *"The designer can now continue iterating in Figma from the developer's latest version. The loop is closed."*

> **Key message**: *Designers and developers always stay in sync — each in their own tool.*

---

## Wrap-Up Talking Points *(~2 min)*

- **Every tool is one the personas already own** — Figma, VS Code + Copilot, GitHub. No new toolchain.
- **No manual spec documents** — no exported PNGs, no Figma Dev Mode screenshots, no Slack "can you move that 4px".
- **This is Vincent's iterative feedback loop made real** — AI as the connective tissue across the SDLC.
- **CI/CD means every design-driven change is automatically validated** — not just "it looks right," but "tests prove it."
- **Next phases** (beyond this demo): AI-generated GitHub Issues from design annotations; automated BrowserStack test runs; Copilot Workspace to resolve CI failures automatically.

---

## Key Decisions

| Decision | Choice | Reason |
|---|---|---|
| Figma → Code bridge | Framelink MCP (community) | No waitlist; works today with any Figma PAT |
| Code → Figma bridge | html.to.design plugin | 2.3M users; free tier covers demos; reliable |
| Test framework | Playwright | Opens a real browser — visually compelling for live demo |
| CI | GitHub Actions | Native to GitHub; zero extra config; triggered on push |
| Repo creation | `gh repo create` (GitHub CLI) | Single command, live on stage |
| Tech stack | Plain HTML/CSS/JS | Zero build step; works in any browser instantly |
| Page | Services page | New content — separate from `aboutus.html`; demonstrates additive workflow |

---

## Files in This Demo Repo

| File | Purpose |
|---|---|
| `demo-plan.md` | This file — full upgraded demo plan and presenter script |
| `aboutus.html` | Existing About Us page — anchor for "what was already built" narrative |
| `services.html` | Services page — generated by Copilot from Figma during the demo (fallback pre-built) |
| `tests/services.spec.js` | Playwright test file — generated by Copilot during the demo (fallback pre-built) |
| `package.json` | Playwright dev dependency |
| `.github/workflows/ci.yml` | GitHub Actions CI — runs Playwright on every push |
| `README.md` | Setup instructions for anyone reproducing the demo |
| `.vscode/mcp.json` | Framelink MCP server config |
| `.env` | Figma PAT — excluded from git by `.gitignore` |

---

## Pre-Demo Checklist

- [ ] `gh auth status` — GitHub CLI authenticated
- [ ] `node --version` ≥ 18; `npx --version` works
- [ ] Figma file created with Services page frame — all layers named, Auto Layout applied
- [ ] Figma Personal Access Token in `.env` and MCP server shows **running** in VS Code
- [ ] `npm install` and `npx playwright install --with-deps chromium` completed
- [ ] `npx playwright test` passes locally
- [ ] html.to.design plugin installed in Figma account
- [ ] Live Server extension installed in VS Code
- [ ] Browser windows arranged: VS Code left, Figma + browser right (or second monitor)

---

## Fallback / Contingency

| If... | Then... |
|---|---|
| MCP server fails to start | Use pre-built `services.html` as the "generated" output; narrate what Copilot would have done |
| Figma URL doesn't resolve | Describe the design aloud + show the pre-built page; narrate the Copilot prompts |
| `gh repo create` fails | Create repo via github.com UI, then `git remote add origin <url>` + `git push` |
| html.to.design localhost import fails | Run `npx serve .` and use the network IP, or paste HTML source into html.to.design's Editor tab |
| Playwright tests fail in CI | The CI log shows exactly which element was missing — use this as a talking point: "CI caught the issue before a user did" |
