// propose-modal.ts - review dialog for promoting body links to typed relations.
//
// The proposals come from the cue-phrase heuristic (propose.ts), which is a
// guess, so nothing is written until the note's owner ticks it here and
// confirms - the same propose-then-apply shape as `lokf propose`. High-
// confidence rows start checked; the fallback (relatedTo) starts unchecked.
import { App, Modal } from "obsidian";
import type { Proposal } from "./propose";

const DEFAULT_CHECK_THRESHOLD = 0.5;

export class ProposeModal extends Modal {
  private proposals: Proposal[];
  private onApply: (selected: Proposal[]) => void;

  constructor(app: App, proposals: Proposal[], onApply: (selected: Proposal[]) => void) {
    super(app);
    this.proposals = proposals;
    this.onApply = onApply;
  }

  onOpen(): void {
    const { contentEl, titleEl } = this;
    titleEl.setText("Promote body links to typed relations");
    contentEl.createEl("p", {
      cls: "ktl-propose-intro",
      text: "Each markdown link in this note's body that points to another concept, with a relation guessed from the surrounding sentence. Choose which to add to the frontmatter - nothing is written until you confirm.",
    });

    const selected = new Set<Proposal>();
    const list = contentEl.createDiv({ cls: "ktl-propose-list" });
    for (const p of this.proposals) {
      const label = list.createEl("label", { cls: "ktl-propose-row" });
      const cb = label.createEl("input", { attr: { type: "checkbox" } });
      cb.checked = p.confidence >= DEFAULT_CHECK_THRESHOLD;
      if (cb.checked) selected.add(p);
      cb.addEventListener("change", () => {
        if (cb.checked) selected.add(p);
        else selected.delete(p);
      });
      const body = label.createDiv({ cls: "ktl-propose-body" });
      const head = body.createDiv({ cls: "ktl-propose-head" });
      head.createSpan({ cls: "ktl-propose-predicate", text: p.predicate });
      head.createSpan({ cls: "ktl-propose-arrow", text: " → " });
      head.createSpan({ cls: "ktl-propose-target", text: p.targetBundle });
      body.createEl("small", {
        cls: "ktl-propose-detail",
        text: `“${p.text}” · ${Math.round(p.confidence * 100)}% · ${p.rationale}`,
      });
    }

    const buttons = contentEl.createDiv({ cls: "ktl-propose-buttons" });
    const apply = buttons.createEl("button", { cls: "mod-cta", text: "Add selected relations" });
    apply.addEventListener("click", () => {
      const chosen = this.proposals.filter((p) => selected.has(p));
      this.close();
      this.onApply(chosen);
    });
    const cancel = buttons.createEl("button", { text: "Cancel" });
    cancel.addEventListener("click", () => this.close());
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
