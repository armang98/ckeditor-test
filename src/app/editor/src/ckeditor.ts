import { HTML_TAGS } from './data';

const CKEDITOR: any = (window as any).CKEDITOR;
CKEDITOR.disableAutoInline = true;

for (const tag of HTML_TAGS) {
    CKEDITOR.dtd.$editable[tag] = 1;
    for (const nested of HTML_TAGS) {
        try {
            if (!CKEDITOR.dtd[tag]) {
                CKEDITOR.dtd[tag] = {};
            }
            CKEDITOR.dtd[tag][nested] = 1;
        } catch (e) {
            console.log({ tag, nested });
            console.error(e);
        }
    }
}

export const CK_OPTIONS = {
    readOnly: false,
    title: false,
    allowedContent: true,
    enterMode: CKEDITOR.ENTER_BR,
    removePlugins: 'image,specialchar',
    toolbarGroups: [
        { name: 'clipboard', groups: ['undo', 'clipboard'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'colors', groups: ['colors'] },
        {
            name: 'paragraph',
            groups: ['align', 'list', 'indent', 'blocks', 'bidi', 'paragraph']
        },
        '/',
        { name: 'styles', groups: ['styles'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'tools', groups: ['tools'] }
    ],
    removeButtons: 'Undo,Redo,Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,Find,Replace,SelectAll,Scayt,PageBreak,Flash,About,Maximize',
    extraAllowedContent: 'img(*){*}[*]',
};

CKEDITOR.editorConfig =  (config: any) => {
    config.toolbarGroups = CK_OPTIONS.toolbarGroups;
    config.removeButtons = CK_OPTIONS.removeButtons;
    config.format_tags = 'p;h1;h2;h3;pre';
    config.removeDialogTabs = 'image:advanced;link:advanced';
};

CKEDITOR.dtd.$removeEmpty.i = false;
CKEDITOR.dtd.$removeEmpty.span = false;
