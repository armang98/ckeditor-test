import {Component, OnInit} from '@angular/core';
import {CkeditorEditor} from './editor/src/editor/editor';
import {EditorControlService} from './service/editor-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ckeditor-test';

  constructor(private editorControlService: EditorControlService) {

  }

  ngOnInit(): void {
    const ckeditorEditor = new CkeditorEditor(this.editorControlService);
    ckeditorEditor.initialize(document.body.querySelector('app-root').querySelector('body').children);
  }

  disableEditor(): void {
    this.editorControlService.nextDisableEditorSubject();
  }

  enableEditor(): void {
    this.editorControlService.nextEnableEditorSubject();
  }
}
