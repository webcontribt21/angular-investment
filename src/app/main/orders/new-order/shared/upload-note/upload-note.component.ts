import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-note',
  templateUrl: './upload-note.component.html',
  styleUrls: ['./upload-note.component.scss'],
})
export class UploadNoteComponent {
  @Input() altNoteKey: string;
}
