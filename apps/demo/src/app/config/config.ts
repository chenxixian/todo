import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { RuI18n as CoreRuI18n, translate } from '@rucken/core';
import { RuI18n as TodoCoreRuI18n } from '@rucken/todo-core';
import { RuI18n as TodoWebRuI18n } from '@rucken/todo-web';
import { RuI18n as WebRuI18n } from '@rucken/web';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale, ruLocale } from 'ngx-bootstrap/locale';
import { RuI18n } from '../i18n/ru.i18n';
import { ICoreConfig } from './config.interface';

library.add(fas, fab);

defineLocale('ru', ruLocale);
defineLocale('en', enGbLocale);

export const config: ICoreConfig = {
  app: {
    id: 'todo-demo',
    title: translate('Rucken: Todo'),
    description: translate('Core with UI for web todo application maked on Angular7+ based on Rucken template'),
    languages: [
      {
        title: translate('Russian'),
        code: 'ru',
        translations: [WebRuI18n, CoreRuI18n, TodoCoreRuI18n, TodoWebRuI18n, RuI18n]
      },
      {
        title: translate('English'),
        code: 'en',
        translations: []
      }
    ]
  },
  authModal: {
    signInInfoMessage: translate(`<p>Demo users:</p><ul>
<li>user with admin group: admin@admin.com, password: 12345678</li>
<li>user with user group: user1@user1.com, password: 12345678</li>
<li>user with user group: user2@user2.com, password: 12345678</li>
</ul>`),
    signUpInfoMessage: ''
  },
  oauth: [
    {
      name: 'facebook',
      icon: ['fab', 'facebook-square'],
      signInTitle: translate('Sign in with Facebook')
    },
    {
      name: 'google-plus',
      icon: ['fab', 'google-plus'],
      signInTitle: translate('Sign in with Google+')
    }
  ]
};