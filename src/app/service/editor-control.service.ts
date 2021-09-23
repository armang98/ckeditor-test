import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorControlService {

  private disableAllEditorSubject = new Subject<void>();
  private enableAllEditorSubject = new Subject<void>();

  constructor() {
  }

  getDisableEditorSubject(): Subject<void> {
    return this.disableAllEditorSubject;
  }

  nextDisableEditorSubject(): void {
    this.disableAllEditorSubject.next();
  }

  getEnableEditorSubject(): Subject<void> {
    return this.enableAllEditorSubject;
  }

  nextEnableEditorSubject(): void {
    this.enableAllEditorSubject.next();
  }
}
