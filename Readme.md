# DerDieDas (ddd)

## Installation:

```
npm i -g .
```

## Usage:

```
# Input
ddd Wort
# Output
Checking URL: https://www.duden.de/rechtschreibung/Wort
===> das <===
```

For words with ä/ö/ü:

```
# Input
ddd Brötchen

# Output
Brötchen sanitized to Broetchen
Checking URL: https://www.duden.de/rechtschreibung/Broetchen
===> das <===
```

Note: Sometimes the Duden URL does not exactly match the URL, because there are several matches. The script currently fails to get the word. The Information should be available in the search result, but it currently cannot be retrieved.

```
# Input
ddd Boot

#Output
Checking URL: https://www.duden.de/rechtschreibung/Boot
Direct URL failed, attempting search with URL: https://www.duden.de/suchen/dudenonline/Boot
===> NOT FOUND <===
```

