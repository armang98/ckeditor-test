import { CK_OPTIONS } from '../ckeditor';
import { CkeditorEditor } from './editor';
import { CkeditorElement } from './element';
import {EditorMode} from './mode';

const CK: any = (window as any).CKEDITOR;

export class CkeditorTextElement implements CkeditorElement {
    private mode: EditorMode = EditorMode.View;
    private wysiwyg: any;
    private defaultOutline = 'none';

    constructor(
        private node: HTMLElement,
        private editor: CkeditorEditor
    ) {
        this.initialize();
    }

    async initializeEditor(): Promise<void> {
        if (this.wysiwyg || this.mode === EditorMode.View) {
            return;
        }
        setTimeout(() => this.editor.destroyEditorsExcept(this), 2500);
        this.wysiwyg = CK.inline(this.node, CK_OPTIONS);
        (window as any).wysiwyg = this.wysiwyg;
    }

    destroyEditor() {
        if (this.wysiwyg) {
            this.wysiwyg.destroy();
            this.wysiwyg = undefined;
            this.node.style.outline = this.defaultOutline;
            this.node.removeAttribute('contenteditable');
        }
    }

    setMode(mode: EditorMode) {
        this.mode = mode;

        if (this.mode === EditorMode.View) {
            this.destroyEditor();
        }
    }

    private initialize(): void {
        this.initializeClick();
        this.initializeHover();
    }

    private initializeClick() {
        this.defaultOutline = this.node.style.outline;
        this.node.addEventListener(
            'click',
            async (e) => {
                if (this.mode === EditorMode.View) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                this.initializeEditor();
                this.node.style.outline = 'dashed 2px #787877';
            },
            {
                capture: true
            }
        );
    }

    private initializeHover() {
        this.defaultOutline = this.node.style.outline;
        this.node.addEventListener('mouseenter', (e) => {
            if (this.mode === EditorMode.View) {
                return;
            }
            if (!this.wysiwyg) {
                e.preventDefault();
            }
            this.node.style.outline = 'dashed 2px #787877';
        });

        this.node.addEventListener('mouseleave', (e) => {
            if (!this.wysiwyg) {
                e.preventDefault();
                this.node.style.outline = this.defaultOutline;
            }
        });
    }
}
