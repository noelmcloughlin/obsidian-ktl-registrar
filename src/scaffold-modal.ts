// scaffold-modal.ts - the two-choice question "Insert the bundle's semantic
// header" asks in a vault with no bundle: is this vault the exhibition, or
// should it hold one? A header on the root index.md turns every note into a
// record, so the plugin never picks that for a vault full of ordinary notes;
// a nested knowledge_bundle/ folder is the wrong shape for an empty vault
// someone just opened to be the bundle. So it asks, and suggests an answer
// from what the vault holds.
import { App, Modal } from "obsidian";

export type ScaffoldChoice = "vault-root" | "folder";

export class ScaffoldChoiceModal extends Modal {
  private suggest: ScaffoldChoice;
  private folderName: string;
  private onChoose: (choice: ScaffoldChoice) => void;

  constructor(app: App, suggest: ScaffoldChoice, folderName: string, onChoose: (choice: ScaffoldChoice) => void) {
    super(app);
    this.suggest = suggest;
    this.folderName = folderName;
    this.onChoose = onChoose;
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.createEl("p", {
      text: "This vault has no knowledge bundle yet. Is this vault the exhibition, or should it hold one?",
    });
    const options = contentEl.createEl("ul");
    options.createEl("li", {
      text: "Make this vault the exhibition: the header goes on the root index.md, and every note here becomes a record.",
    });
    options.createEl("li", {
      text: `Create a ${this.folderName} folder inside it: the header goes there, and the notes around it are left alone.`,
    });
    contentEl.createEl("p", {
      cls: "lokf-scaffold-hint",
      text:
        this.suggest === "vault-root"
          ? "Suggested: make this vault the exhibition - it holds nothing but an index.md."
          : "Suggested: create the folder - this vault already holds notes that were never LOKF concepts.",
    });
    const buttons = contentEl.createDiv({ cls: "lokf-confirm-buttons" });
    const root = buttons.createEl("button", { text: "Make this vault the exhibition" });
    const folder = buttons.createEl("button", { text: `Create a ${this.folderName} folder` });
    const suggested = this.suggest === "vault-root" ? root : folder;
    suggested.addClass("mod-cta");
    root.addEventListener("click", () => {
      this.close();
      this.onChoose("vault-root");
    });
    folder.addEventListener("click", () => {
      this.close();
      this.onChoose("folder");
    });
    const cancel = buttons.createEl("button", { text: "Cancel" });
    cancel.addEventListener("click", () => this.close());
    suggested.focus();
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
