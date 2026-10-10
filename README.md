# MSG Test Automation – Advantage Online Shopping

Automatisierte End-to-End-Tests für die Demo-Webseite [Advantage Online Shopping](http://www.advantageonlineshopping.com/) mit **Playwright und TypeScript**.

Das Projekt wurde als technische Aufgabenstellung für eine Test-Automation-Engineer-Position erstellt. Der Schwerpunkt liegt auf einer modularen Testarchitektur, datengetriebenen Tests und der Trennung von fachlichen und technischen Keywords.

## Testszenarien

**Szenario 1 – Neuen Kunden registrieren und Produkt kaufen**

1. Shop öffnen und Ausgangszustand prüfen.
2. Neuen Benutzer mit zufällig ergänztem Benutzernamen registrieren.
3. Zur Startseite navigieren und den neuen Benutzer erneut anmelden.
4. Ein Produkt in den Warenkorb legen und Warenkorb prüfen.
5. Versand und Zahlung abschließen; Kaufbestätigung prüfen.
6. Benutzer abmelden.

**Szenario 2 – Drei Produkte kaufen**

1. Shop öffnen und mit einem vorhandenen Benutzer anmelden.
2. Drei Produkteinheiten in den Warenkorb legen und Mengen prüfen.
3. Versand und Zahlung abschließen; Kaufbestätigung prüfen.
4. Benutzer abmelden.

> **Hinweis zu Szenario 1:** Die erneute Navigation zur Startseite wird in diesem Demo-Shop bewusst als Workaround vor dem erneuten Login verwendet. Sie ersetzt keine allgemein gültige Logout-Implementierung.

## Voraussetzungen

- Node.js und npm
- Internetzugriff auf die Demo-Webseite

Die Abhängigkeiten sind in `package.json` und `package-lock.json` definiert. Für die lokale Einrichtung sind keine weiteren Testframeworks erforderlich.

## Installation

Im Projektverzeichnis ausführen:

```bash
npm ci
npx playwright install
```

Unter Linux bzw. in CI können zusätzlich benötigte Browser-Systempakete mit folgendem Befehl installiert werden:

```bash
npx playwright install --with-deps
```

## Tests ausführen

Alle Tests:

```bash
npx playwright test
```

Nur Szenario 1:

```bash
npx playwright test --grep "Scenario 1"
```

Nur Szenario 2:

```bash
npx playwright test --grep "Scenario 2"
```

Tests mit sichtbarem Browser:

```bash
npx playwright test --headed
```

HTML-Testbericht öffnen:

```bash
npx playwright show-report
```

Der Bericht wird nach einem Testlauf im Verzeichnis `playwright-report/` erzeugt.

## Projektstruktur

```text
.github/workflows/
  playwright.yml              # GitHub-Actions-Pipeline
data/
  testdata.csv                # Testdaten für beide Szenarien
docs/
  keyword-library.html       # Statische HTML-Dokumentation der Keywords
src/
  config/
    product-catalog.ts        # Zuordnung von Produkten zu Kategorien
  data/
    test-data-reader.ts       # CSV-Einlesen und Aufbereitung der Einkaufsliste
    test-data.types.ts        # Typdefinitionen
  keywords/
    account.keywords.ts       # Fachliche Benutzer- und Kontoschritte
    shopping.keywords.ts      # Fachliche Einkaufs- und Zahlungsschritte
    user.keywords.ts          # Testdatenzugriff und Navigation
  pages/
    components/               # Wiederverwendbare UI-Komponenten
    *.page.ts                 # Technische Page Objects
  utils/                      # Hilfsfunktionen
tests/
  test-automation.spec.ts     # Beide End-to-End-Szenarien
playwright.config.ts          # Playwright-Konfiguration
package.json
package-lock.json
```

## Architektur und Keyword-Driven Testing

Die Tests beschreiben den **fachlichen Ablauf** und rufen dazu Methoden aus `src/keywords/` auf. Die Keyword-Klassen delegieren technische Browserinteraktionen an die Page Objects und UI-Komponenten in `src/pages/`.

```text
Testszenario
    ↓
Fachliche Keywords (AccountKeywords / ShoppingKeywords / UserKeywords)
    ↓
Technische Page Objects und UI-Komponenten
    ↓
Playwright
    ↓
Advantage Online Shopping
```

Beispiel eines fachlichen Keywords:

```typescript
await shopping.addShoppingListToCart(shoppingList);
await shopping.verifyAllProductsComplete(shoppingList);
```

Die Keyword-Bibliothek ist unter **[`docs/keyword-library.html`](docs/keyword-library.html)** dokumentiert. Die HTML-Datei lässt sich ohne Webserver direkt im Browser öffnen. Sie ist eine **statische Dokumentation** und wird bei Codeänderungen nicht automatisch aktualisiert.

## Testdaten und Parametrisierung

Die Daten stehen in `data/testdata.csv`. Die Tests verwenden die Datensätze mit den Schlüsseln `newCustomer` und `existingCustomer`.

- `UserKeywords` stellt Benutzer-, Registrierungs-, Einkaufs- und Zahlungsdaten bereit.
- `test-data-reader.ts` liest die CSV-Datei über `csv-parse`.
- Wiederholt aufgeführte Produktnamen werden zu einer Einkaufslistenposition mit entsprechender Menge zusammengefasst.
- Für die Registrierung in Szenario 1 wird der Benutzername um einen zufälligen Zusatz ergänzt.

**Wichtig:** `existingCustomer` muss gültige Zugangsdaten enthalten. Die Demo-Webseite kann außerdem auf wiederholte Registrierungen oder externe Netzwerkbedingungen empfindlich reagieren. In der CSV-Datei sollten ausschließlich Testdaten verwendet werden – keine echten Passwörter oder Zahlungsdaten.

## Testauswertung und CI

Die Playwright-Konfiguration verwendet Chromium und den HTML-Reporter. Bei Fehlern werden Traces aufbewahrt; bei einem ersten Retry können Screenshots erzeugt werden.

Die GitHub-Actions-Pipeline in `.github/workflows/playwright.yml`:

1. Checkt das Repository aus.
2. Richtet Node.js ein.
3. Installiert npm-Abhängigkeiten mit `npm ci`.
4. Installiert Playwright-Browser und Systemabhängigkeiten.
5. Führt die Tests aus.
6. Lädt den HTML-Testbericht als Workflow-Artefakt hoch.

Die Tests greifen auf eine **externe Demo-Webseite** zu. Verfügbarkeit, Ladezeiten und Zustand der Anwendung können die Ergebnisse beeinflussen.

## Verwendete Technologien

- Playwright Test
- TypeScript
- Node.js / npm
- `csv-parse`
- GitHub Actions

## Hinweise

- Die Testausführung erfolgt aus dem **Projektverzeichnis**, da der CSV-Pfad relativ dazu aufgelöst wird.
- `node_modules/`, `test-results/` und generierte Berichte gehören normalerweise nicht in die Versionsverwaltung.
- Die HTML-Keyword-Dokumentation ist Teil der Abgabe und benötigt keinen zusätzlichen Generator.
