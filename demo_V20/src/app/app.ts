import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, KeyValuePipe, FormsModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  public languages: any = {
    'en': 'English',
    'hi': 'Hindi',
    'mar': 'Marathi',
    'fr': 'French',
    'ger': 'German',
    'ch' : 'Chinese',
    'ja' : 'Japanese'
  };

  // signal to store selected language
  public langKey = signal('en');

  constructor(private translate: TranslateService) {
    this.translate.use(this.langKey());
  }

  changeLanguage(lang: string) {
    this.langKey.set(lang);
    this.translate.use(lang);
  }
}
