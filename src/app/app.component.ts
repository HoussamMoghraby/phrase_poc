import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [TranslateModule, CommonModule], // Only import the pipe/template things now
})
export class AppComponent {
  translationKeys: string[] = [];
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'es', 'ar']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.loadTranslationKeys();
  }

  loadTranslationKeys() {
    this.translate
      .getTranslation(this.translate.currentLang)
      .subscribe((translations) => {
        this.translationKeys = this.extractKeys(translations);
      });
  }

  extractKeys(obj: any, prefix: string = ''): string[] {
    return Object.keys(obj).reduce((keys: string[], key: string) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...this.extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
      return keys;
    }, []);
  }

  switchLanguage(event: any) {
    this.translate.use(event.target.value);
  }
}
