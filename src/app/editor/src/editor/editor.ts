import {CkeditorElement} from './element';
import {CkeditorTextElement} from './text-element';
import {EditorMode} from './mode';
import {NodeType} from './node';
import {INLINE_ELEMENTS} from '../data';
import {EditorControlService} from '../../../service/editor-control.service';

export class CkeditorEditor {
  mode = EditorMode.Edit;

  private elements: CkeditorElement[] = [];

  constructor(private editorControlService: EditorControlService) {
    editorControlService.getDisableEditorSubject().subscribe(() => {
      this.setMode(EditorMode.View);
    });
    editorControlService.getEnableEditorSubject().subscribe(() => {
      this.setMode(EditorMode.Edit);
    });
  }

  initialize(children: HTMLCollection): void {
    const textElements = Array.from(children)
      .map((node) => this.initializeContentTree(node))
      .flat();

    this.elements = [...textElements];

    for (const element of this.elements) {
      element.setMode(this.mode);
    }
  }

  destroyAllEditors(): void {
    for (const elem of this.elements) {
      elem.destroyEditor();
    }
  }

  destroyEditorsExcept(element: CkeditorElement): void {
    for (const elem of this.elements) {
      if (elem !== element) {
        elem.destroyEditor();
      }
    }
  }

  setMode(mode: EditorMode): void {
    for (const element of this.elements) {
      element.setMode(mode);
    }
  }

  private initializeContentTree(root: Element): CkeditorTextElement[] {

    if (this.hasDirectContent(root)) {
      const element = new CkeditorTextElement(root as HTMLElement, this);
      return [element];
    }

    return Array.from(root.children)
      .map((child) => this.initializeContentTree(child))
      .flat();
  }

  private hasDirectContent(element: Element): boolean {
    const nodes = Array.from(element.childNodes);

    for (const node of nodes) {
      if (node.nodeType === NodeType.Text) {
        const text = node as Text;
        if (!!text.data.trim()) {
          return true;
        }
      } else if (node.nodeType === NodeType.Element) {
        const elem = node as Element;
        const isInline = INLINE_ELEMENTS.has(elem.tagName);
        if (isInline) {
          return true;
        }
      }
    }

    return false;
  }
}
