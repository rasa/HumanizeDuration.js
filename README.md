# Humanize Duration

This friendly fork of [@EvanHahn](https://github.com/EvanHahn)'s
[HumanizeDuration.js](https://github.com/EvanHahn/HumanizeDuration.js)
uses the shortest non-ambiguous terms for the units of time.

For example, the following abbreviations for English (en) are used:

| Unit           | Abbreviation |
| -------------- | ------------ |
| Year(s)        | "y"          |
| Month(s)       | "mo"         |
| Day(s)         | "d"          |
| Hour(s)        | "h"          |
| Minute(s)      | "m"          |
| Second(s)      | "s"          |
| Millisecond(s) | "ms"         |

It also replaces the default spacer of " " with "", and the default delimiter of ", " with " ".

So, what was shown as "1 hour, 2 minutes, 3 seconds", this fork shows as "1h 2m 3s".

When possible, the shortest unit of time will get the shortest abbreviation.
For example, in English, the word "minute" is abbreviated as "m", and "month" as "mo".

## Why create this fork

This fork's parent, [EvanHahn/HumanizeDuration.js](https://github.com/EvanHahn/HumanizeDuration.js) says
"This library is actively maintained but no new features will be added."

## Halucinations

ChatGPT and Bard/Gemini were used to provide the abbreviations,
so it's possible they halucinated.
If you find anything that can be improved, please create an
[issue](https://github.com/rasa/HumanizeDuration.js/issues/new),
or submit a PR. Thanks.

## Supported languages

Humanize Duration supports the following languages:

| Language             | Translation     | Code   |
| -------------------- | --------------- | ------ |
| Afrikaans            | Afrikaans       | af     |
| Albanian             | shqip           | sq     |
| Amharic              | አማርኛ            | am     |
| Arabic               | العربية         | ar     |
| Basque               | euskara         | eu     |
| Bengali              | বাংলা           | bn     |
| Bulgarian            | български       | bg     |
| Catalan              | català          | ca     |
| Central Kurdish      | کوردیی ناوەڕاست | ckb    |
| Chinese, simplified  | 中文 (简体)     | zh_CN  |
| Chinese, traditional | 中文 (繁體)     | zh_TW  |
| Croatian             | hrvatski        | hr     |
| Czech                | čeština         | cs     |
| Danish               | dansk           | da     |
| Dutch                | Nederlands      | nl     |
| English              | English         | en     |
| Esperanto            | Esperanto       | eo     |
| Estonian             | eesti keel      | et     |
| Faroese              | føroyskt        | fo     |
| Farsi/Persian        | فارسی           | fa     |
| Finnish              | suomi           | fi     |
| French               | français        | fr     |
| German               | Deutsch         | de     |
| Greek                | Ελληνικά        | el     |
| Hebrew               | עברית           | he     |
| Hindi                | हिंदी           | hi     |
| Hungarian            | magyar          | hu     |
| Icelandic            | íslenska        | is     |
| Indonesian           | Indonesia       | id     |
| Italian              | italiano        | it     |
| Japanese             | 日本語          | ja     |
| Kannada              | ಕನ್ನಡ           | kn     |
| Khmer                | ភាសាខ្មែរ       | km     |
| Korean               | 한국어          | ko     |
| Kurdish              | Kurdî           | ku     |
| Lao                  | ລາວ             | lo     |
| Latvian              | latviešu        | lv     |
| Lithuanian           | lietuvių        | lt     |
| Macedonian           | македонски      | mk     |
| Mongolian            | монгол          | mn     |
| Malay                | Melayu          | ms     |
| Marathi              | मराठी           | mr     |
| Norwegian            | norsk           | no     |
| Polish               | polski          | pl     |
| Portuguese           | português       | pt     |
| Romanian             | română          | ro     |
| Russian              | русский         | ru     |
| Serbian              | српски          | sr     |
| Slovak               | slovenčina      | sk     |
| Slovenian            | slovenščina     | sl     |
| Spanish              | español         | es     |
| Swahili              | Kiswahili       | sw     |
| Swedish              | svenska         | sv     |
| Tamil                | தமிழ்           | ta     |
| Telugu               | తెలుగు          | te     |
| Thai                 | ไทย             | th     |
| Turkish              | Türkçe          | tr     |
| Ukrainian            | українська      | uk     |
| Urdu                 | اردو            | ur     |
| Uzbek                | o'zbek          | uz     |
| Uzbek (Cyrillic)     | Ўзбек (Кирилл)  | uz_CYR |
| Vietnamese           | Tiếng Việt      | vi     |
| Welsh                | Cymraeg         | cy     |

## More information

For more information on the package this was forked from, visit [EvanHahn/HumanizeDuration.js](https://github.com/EvanHahn/HumanizeDuration.js?tab=readme-ov-file#humanize-duration).
