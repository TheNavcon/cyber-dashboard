import { NistCategory } from '../types/assessment';

type Priority = 'Hoch' | 'Mittel' | 'Niedrig' | 'Kritisch';

interface MeasureDefinition {
  no: {
    title: string;
    description: string;
    tasks: string[];
    priority: Priority;
  };
  partial: {
    title: string;
    description: string;
    tasks: string[];
    priority: Priority;
  };
}

export const measureDefinitions: Record<string, MeasureDefinition> = {
  // Bestehende Einträge
  'ORG.V1': {
    no: {
      title:
        'Bestimme eine eindeutige Ansprechperson für Informationssicherheit',
      description:
        'Eine verantwortliche Person für Informationssicherheit muss bestimmt werden.',
      priority: 'Hoch',
      tasks: [
        'Position definieren',
        'Stellvertretung bestimmen',
        'Verantwortlichkeiten dokumentieren',
      ],
    },
    partial: {
      title: 'Dokumentiere und kommuniziere Verantwortungsbereiche',
      description:
        'Verantwortungsbereiche müssen schriftlich festgehalten und kommuniziert werden.',
      priority: 'Mittel',
      tasks: [
        'Aktuelle Verantwortlichkeiten dokumentieren',
        'Dokumentation allen Mitarbeitern zugänglich machen',
      ],
    },
  },
  'ORG.V2': {
    no: {
      title:
        'Offiziell eine Stellvertretung ernennen und deren Aufgaben definieren',
      description:
        'Eine stellvertretende Person für Informationssicherheit muss bestimmt werden.',
      priority: 'Hoch',
      tasks: [
        'Stellvertretung identifizieren',
        'Aufgaben und Kompetenzen definieren',
        'Schriftliche Bestätigung einholen',
      ],
    },
    partial: {
      title:
        'Ergänze die bestehende Regelung um eine klare Stellvertreter-Rolle',
      description:
        'Die Stellvertreterregelung muss mit Freigaben und Kompetenzen ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Bestehende Regelung analysieren',
        'Fehlende Kompetenzen ergänzen',
        'Dokumentation aktualisieren',
      ],
    },
  },
  'ORG.V3': {
    no: {
      title: 'Erstelle ein schriftliches Rollen- und Aufgabenprofil',
      description:
        'Ein schriftliches Rollen- und Aufgabenprofil muss erstellt und im Qualitätshandbuch hinterlegt werden.',
      priority: 'Hoch',
      tasks: [
        'Aufgabenprofil erstellen',
        'Rollenbeschreibung definieren',
        'Im Qualitätshandbuch dokumentieren',
        'Von der Geschäftsleitung freigeben lassen',
      ],
    },
    partial: {
      title: 'Aktualisiere die vorhandenen Aufgabenbeschreibungen',
      description:
        'Die vorhandenen Aufgabenbeschreibungen müssen aktualisiert und fehlende Verantwortlichkeiten ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Bestehende Beschreibungen prüfen',
        'Fehlende Verantwortlichkeiten identifizieren',
        'Dokumentation vervollständigen',
      ],
    },
  },
  'ORG.V4': {
    no: {
      title:
        'Führungs- und Entscheidungsbefugnisse schriftlich bestätigen lassen',
      description:
        'Die Führungs- und Entscheidungsbefugnisse der Person müssen schriftlich durch die Geschäftsleitung bestätigt werden.',
      priority: 'Kritisch',
      tasks: [
        'Befugnisse definieren',
        'Schriftliche Bestätigung einholen',
        'Kommunikation an relevante Stakeholder',
      ],
    },
    partial: {
      title: 'Überprüfe und erweitere die Kompetenzen',
      description:
        'Die Kompetenzen müssen überprüft und erweitert werden, insbesondere Budget- und Weisungsbefugnisse.',
      priority: 'Hoch',
      tasks: [
        'Aktuelle Kompetenzen analysieren',
        'Budget- und Weisungsbefugnisse festlegen',
        'Schriftliche Dokumentation erstellen',
      ],
    },
  },
  'ORG.I1': {
    no: {
      title: 'Führe planmässige Audits ein',
      description:
        'Planmässige Audits (intern/extern) müssen eingeführt und ein Prüfzyklus festgelegt werden.',
      priority: 'Hoch',
      tasks: [
        'Audit-Plan erstellen',
        'Prüfzyklus definieren',
        'Verantwortlichkeiten festlegen',
        'Dokumentationsvorlage erstellen',
      ],
    },
    partial: {
      title: 'Erweitere das bestehende Prüfverfahren',
      description:
        'Das bestehende Prüfverfahren muss erweitert und die Ergebnisse systematisch archiviert werden.',
      priority: 'Mittel',
      tasks: [
        'Prüfverfahren analysieren',
        'Externe Pen-Tests einplanen',
        'Archivierungssystem implementieren',
      ],
    },
  },
  'ORG.I2': {
    no: {
      title: 'Implementiere ein zentrales Fehlermanagement-System',
      description:
        'Ein zentrales Fehlermanagement-System (Ticket-System) zur lückenlosen Dokumentation muss implementiert werden.',
      priority: 'Hoch',
      tasks: [
        'Ticket-System auswählen',
        'System einrichten und konfigurieren',
        'Prozesse definieren',
        'Mitarbeiter schulen',
      ],
    },
    partial: {
      title: 'Standardisiere den Mängel-Dokumentationsprozess',
      description:
        'Der Mängel-Dokumentationsprozess muss standardisiert und erforderliche Informationen festgelegt werden.',
      priority: 'Mittel',
      tasks: [
        'Prozess analysieren',
        'Standardvorlage erstellen',
        'Erforderliche Informationen definieren',
      ],
    },
  },
  'ORG.I3': {
    no: {
      title: 'Etabliere einen PDCA-Zyklus',
      description:
        'Ein PDCA-Zyklus (Plan-Do-Check-Act) mit festen Terminen zur Verbesserung der IT-Sicherheit muss etabliert werden.',
      priority: 'Hoch',
      tasks: [
        'PDCA-Zyklus definieren',
        'Termine festlegen',
        'Verantwortlichkeiten zuweisen',
        'Dokumentation erstellen',
      ],
    },
    partial: {
      title: 'Binde die Mitarbeitenden stärker ein',
      description:
        'Die Mitarbeitenden müssen stärker eingebunden werden, z.B. durch regelmässiges Sammeln von Verbesserungsvorschlägen.',
      priority: 'Mittel',
      tasks: [
        'Feedback-System einrichten',
        'Regelmässige Meetings planen',
        'Verbesserungsvorschläge dokumentieren',
      ],
    },
  },
  'ORG.I4': {
    no: {
      title: 'Identifiziere alle IT-Risiken und erstelle ein Risikoregister',
      description:
        'Ein Risikoregister mit Bewertung nach Eintrittswahrscheinlichkeit und Schaden muss erstellt werden.',
      priority: 'Hoch',
      tasks: [
        'IT-Risiken identifizieren',
        'Risikoregister erstellen',
        'Risiken bewerten',
        'Massnahmen definieren',
      ],
    },
    partial: {
      title: 'Aktualisiere die bestehende Risikoliste regelmässig',
      description:
        'Die bestehende Risikoliste muss regelmässig aktualisiert und neue Risiken integriert werden.',
      priority: 'Mittel',
      tasks: [
        'Bestehende Liste prüfen',
        'Neue Risiken identifizieren',
        'Quartalsweise Updates planen',
      ],
    },
  },
  'ORG.I5': {
    no: {
      title: 'Erstelle regelmässige Risikoberichte für das Management',
      description:
        'Regelmässige Risikoberichte müssen erstellt und auf Management-Ebene präsentiert werden.',
      priority: 'Hoch',
      tasks: [
        'Berichtsvorlage erstellen',
        'Präsentationsformat definieren',
        'Regelmässige Termine vereinbaren',
      ],
    },
    partial: {
      title: 'Integriere IT-Risiken in Management-Meetings',
      description:
        'IT-Risiken müssen als fester Tagesordnungspunkt in den Sitzungen der Geschäftsleitung integriert werden.',
      priority: 'Mittel',
      tasks: [
        'Meeting-Struktur anpassen',
        'Berichterstattung standardisieren',
        'Follow-up-Prozess definieren',
      ],
    },
  },
  'ORG.R1': {
    no: {
      title: 'Überarbeite die Dokumente in einfacher Sprache',
      description:
        'Die Dokumente müssen in einfacher Sprache überarbeitet und interne Schulungen durchgeführt werden.',
      priority: 'Hoch',
      tasks: [
        'Dokumente überarbeiten',
        'Schulungskonzept erstellen',
        'Schulungen durchführen',
        'Verständnis überprüfen',
      ],
    },
    partial: {
      title: 'Sammle Feedback und passe Unklarheiten an',
      description:
        'Feedback der Mitarbeitenden muss gesammelt und Unklarheiten in den Richtlinien angepasst werden.',
      priority: 'Mittel',
      tasks: [
        'Feedback-Runden durchführen',
        'Unklarheiten identifizieren',
        'Anpassungen vornehmen',
      ],
    },
  },
  'ORG.R2': {
    no: {
      title: 'Lege einen festen Überarbeitungszyklus fest',
      description:
        'Ein fester Überarbeitungszyklus (max. 3 Jahre) muss im Qualitätsmanagement festgelegt werden.',
      priority: 'Mittel',
      tasks: [
        'Zyklus definieren',
        'Verantwortlichkeiten festlegen',
        'Im QM-System verankern',
      ],
    },
    partial: {
      title: 'Strukturiere die vorhandenen Dokumente nach Änderungsbedarf',
      description:
        'Die vorhandenen Dokumente müssen nach Änderungsbedarf strukturiert und Aktualisierungsintervalle erweitert werden.',
      priority: 'Niedrig',
      tasks: [
        'Dokumente kategorisieren',
        'Änderungsbedarf bewerten',
        'Intervalle festlegen',
      ],
    },
  },
  'ORG.R3': {
    no: {
      title: 'Entferne konsequent unnötige Administratorenrechte',
      description:
        'Unnötige Administratorenrechte müssen entfernt und ein Rollen- und Rechtemodell eingeführt werden.',
      priority: 'Hoch',
      tasks: [
        'Rechte analysieren',
        'Rollen definieren',
        'Rechte anpassen',
        'Modell dokumentieren',
      ],
    },
    partial: {
      title: 'Führe regelmässige Kontrollen der Admin-Rechte durch',
      description:
        'Regelmässige Kontrollen müssen durchgeführt werden, um verbliebene Admin-Rechte zu identifizieren und abzuschaffen.',
      priority: 'Mittel',
      tasks: [
        'Kontrollprozess definieren',
        'Kontrollen durchführen',
        'Rechte bereinigen',
      ],
    },
  },
  'ORG.R4': {
    no: {
      title: 'Rüste 2FA auf allen extern zugänglichen Anwendungen nach',
      description:
        '2FA muss auf allen extern zugänglichen Anwendungen (VPN, E-Mail, Cloud-Dienste etc.) nachgerüstet werden.',
      priority: 'Kritisch',
      tasks: [
        'Systeme identifizieren',
        '2FA implementieren',
        'Benutzer schulen',
        'Rollout durchführen',
      ],
    },
    partial: {
      title: 'Erstelle einen Zeitplan zur 2FA-Implementierung',
      description:
        'Ein Zeitplan zur nachträglichen Implementierung von 2FA muss erstellt werden.',
      priority: 'Hoch',
      tasks: ['Systeme prüfen', 'Zeitplan erstellen', 'Ressourcen planen'],
    },
  },
  'ORG.R5': {
    no: {
      title: 'Aktualisiere die Passwortrichtlinie',
      description:
        'Die Passwortrichtlinie muss gemäss Best Practices aktualisiert und eine verpflichtende Passwortlänge durchgesetzt werden.',
      priority: 'Hoch',
      tasks: [
        'Richtlinie überarbeiten',
        'Technische Umsetzung planen',
        'Benutzer informieren',
        'Änderungen durchsetzen',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Passwortkriterien',
      description:
        'Bestehende Kennwortrichtlinien müssen überprüft und fehlende Kriterien ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Richtlinien analysieren',
        'Kriterien ergänzen',
        'Änderungen kommunizieren',
      ],
    },
  },

  // Hier beginnt der "Rest" im gleichen Format

  'ORG.R6': {
    no: {
      title: 'Erzwinge die Passwortregeln technisch',
      description:
        'Passwortregeln müssen technisch durchgesetzt und Kontrollen eingeführt werden.',
      priority: 'Hoch',
      tasks: [
        'AD-Einstellungen anpassen',
        'GPOs aktualisieren',
        'Regelmäßige Passwort-Checks durchführen',
        'User-Anleitung verteilen',
      ],
    },
    partial: {
      title: 'Ergänze stichprobenartige Kontrollen',
      description:
        'Stichprobenartige Kontrollen und Sensibilisierungsmaßnahmen müssen eingeführt werden.',
      priority: 'Mittel',
      tasks: [
        'Audit-Plan erstellen',
        'Schulung organisieren',
        'Regelmäßige Berichte verfassen',
      ],
    },
  },
  'ORG.R7': {
    no: {
      title:
        'Erarbeite eine Datenklassifizierung und entsprechende Umgangsrichtlinien',
      description:
        'Das Unternehmen benötigt Richtlinien zum Umgang mit Daten (Papier, digital, Cloud etc.).',
      priority: 'Hoch',
      tasks: [
        'Datenklassifizierungsmodell definieren',
        'Richtlinien formulieren',
        'Genehmigung durch Geschäftsleitung einholen',
        'Mitarbeiter schulen',
      ],
    },
    partial: {
      title: 'Aktualisiere die bestehenden Regelungen für alle Datenbereiche',
      description:
        'Die vorhandenen Regelungen müssen auf alle Datenbereiche ausgeweitet und angepasst werden.',
      priority: 'Mittel',
      tasks: [
        'Vorhandene Dokumente prüfen',
        'Datenbereiche identifizieren',
        'Aktualisierte Richtlinien kommunizieren',
      ],
    },
  },
  'ORG.R8': {
    no: {
      title: 'Konfiguriere Account-Lockout-Richtlinien',
      description:
        'Es müssen Verzögerungen oder Lockouts bei mehreren Fehlversuchen eingerichtet werden, um Brute-Force-Angriffe zu erschweren.',
      priority: 'Hoch',
      tasks: [
        'Lockout-Policy in AD festlegen',
        'Mindest-Wartezeiten definieren',
        'Admin-Konten überwachen',
        'User informieren',
      ],
    },
    partial: {
      title: 'Erhöhe die vorhandene Lockout-Dauer',
      description:
        'Die vorhandene Lockout-Dauer muss erhöht und den Usern kommuniziert werden.',
      priority: 'Mittel',
      tasks: [
        'Lockout-Dauer analysieren',
        'Erhöhte Werte einstellen',
        'Benutzer informieren',
      ],
    },
  },
  'ORG.R9': {
    no: {
      title: 'Implementiere ein systematisches Compliance-Checking',
      description:
        'Ein regelmäßiges Compliance-Checking (z.B. vierteljährlich) muss eingeführt werden, um Richtlinienumsetzung zu messen.',
      priority: 'Hoch',
      tasks: [
        'Checkliste erstellen',
        'Verantwortliche definieren',
        'Ergebnisse dokumentieren',
        'Maßnahmen bei Abweichungen ergreifen',
      ],
    },
    partial: {
      title: 'Erstelle einen Maßnahmenplan zur Erhöhung der Umsetzungsquote',
      description:
        'Ein konkreter Maßnahmenplan muss erstellt und regelmäßige Nachprüfungen durchgeführt werden.',
      priority: 'Mittel',
      tasks: [
        'Maßnahmen priorisieren',
        'Zuständige benennen',
        'Nachprüfungen terminieren',
      ],
    },
  },
  'ORG.R10': {
    no: {
      title: 'Überarbeite das Rollen- und Rechtekonzept',
      description:
        'Ein durchgängiges Rollen- und Rechtekonzept muss erarbeitet werden, um Adminzugriffe strikt auf das Minimum zu beschränken.',
      priority: 'Hoch',
      tasks: [
        'Zugriffsrechte erheben',
        'Rollenmodell definieren',
        'Rechte technisch umsetzen',
        'Dokumentation anfertigen',
      ],
    },
    partial: {
      title: 'Führe ein Access-Review-Verfahren ein',
      description:
        'Es muss ein halbjährliches Access-Review-Verfahren etabliert werden, um Adminrechte regelmäßig zu überprüfen.',
      priority: 'Mittel',
      tasks: [
        'Review-Prozess definieren',
        'Kontrollintervalle festlegen',
        'Abweichungen dokumentieren',
      ],
    },
  },
  'ORG.R11': {
    no: {
      title:
        'Integriere ein Monitoring- und Protokollierungssystem für Remote-Access',
      description:
        'Fernwartungszugriffe von externen Lieferanten müssen überwacht und protokolliert werden.',
      priority: 'Hoch',
      tasks: [
        'Monitoring-Tool auswählen',
        'Protokollierung aktivieren',
        'Zugriffsrollen definieren',
        'Berichte regelmäßig prüfen',
      ],
    },
    partial: {
      title:
        'Erweitere das bestehende Monitoring auf alle externen Dienstleister',
      description:
        'Das bestehende Monitoring-System muss auf alle Dienstleister und Alarmierungsregeln ausgeweitet werden.',
      priority: 'Mittel',
      tasks: [
        'Aktuelle Monitoring-Umgebung prüfen',
        'Alarmierungsregeln definieren',
        'Umsetzung dokumentieren',
      ],
    },
  },
  'ORG.R12': {
    no: {
      title: 'Führe einen Passwortmanager unternehmensweit ein',
      description:
        'Ein Passwortmanager muss eingeführt werden, um die Passwortqualität sicherzustellen und einfache Verwaltung zu ermöglichen.',
      priority: 'Hoch',
      tasks: [
        'Tool evaluieren',
        'IT-Sicherheit und Compliance prüfen',
        'Rollout planen',
        'Mitarbeiter schulen',
      ],
    },
    partial: {
      title: 'Erweitere den bereits eingeführten Passwortmanager',
      description:
        'Der Passwortmanager muss auf alle relevanten Systeme und Nutzergruppen ausgeweitet werden.',
      priority: 'Mittel',
      tasks: [
        'Bestehenden Einsatz analysieren',
        'Fehlende Systeme integrieren',
        'Zugriffsrechte definieren',
      ],
    },
  },

  'ORG.D1': {
    no: {
      title: 'Ernennung eines/einer Datenschutzbeauftragten',
      description:
        'Eine verantwortliche Person für den Datenschutz muss offiziell bestimmt und deren Rolle dokumentiert werden.',
      priority: 'Hoch',
      tasks: [
        'Person bestimmen',
        'Aufgabenbeschreibung erstellen',
        'Reporting-Pflichten definieren',
        'Kommunikation im Unternehmen',
      ],
    },
    partial: {
      title: 'Ergänze die bestehende Verantwortlichkeitsregelung',
      description:
        'Die bestehende Verantwortlichkeitsregelung muss um klare Eskalations- und Entscheidungswege ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Aktuelle Regelung prüfen',
        'Eskalationswege definieren',
        'Verantwortlichkeiten dokumentieren',
      ],
    },
  },
  'ORG.D2': {
    no: {
      title: 'Erstelle ein Stellenprofil für Datenschutz-Verantwortliche',
      description:
        'Ein detailliertes Stellenprofil muss erstellt und ins interne Organisationshandbuch integriert werden.',
      priority: 'Hoch',
      tasks: [
        'Aufgaben definieren',
        'Kompetenzen festlegen',
        'Profil im Handbuch veröffentlichen',
        'Geschäftsleitung informieren',
      ],
    },
    partial: {
      title: 'Aktualisiere vorhandene Dokumente um konkrete Tätigkeitsbereiche',
      description:
        'Die vorhandenen Dokumente müssen um konkrete Tätigkeitsbereiche (z.B. Meldepflichten) ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Dokumente sichten',
        'Zusätzliche Bereiche definieren',
        'Versionierung und Freigabe regeln',
      ],
    },
  },
  'ORG.D3': {
    no: {
      title: 'Führe ein Data-Classification-Modell ein',
      description:
        'Ein einfaches Data-Classification-Modell (z.B. Intern, Vertraulich, Öffentlich) muss eingeführt und verbindlich gemacht werden.',
      priority: 'Hoch',
      tasks: [
        'Klassifizierungsstufen definieren',
        'Schulungen für Mitarbeiter organisieren',
        'Kommunikation in allen Abteilungen sicherstellen',
      ],
    },
    partial: {
      title: 'Präzisiere die bereits vorhandenen Klassifizierungsstufen',
      description:
        'Die vorhandenen Klassifizierungsstufen müssen präzisiert und regelmäßige Kontrollen durchgeführt werden.',
      priority: 'Mittel',
      tasks: [
        'Stufen analysieren',
        'Regelmäßige Checks definieren',
        'Anpassungen kommunizieren',
      ],
    },
  },
  'ORG.D4': {
    no: {
      title: 'Erstelle Leitlinien für den Umgang mit klassifizierten Daten',
      description:
        'Der Umgang mit klassifizierten Daten (Zugriff, Speicherung, Weitergabe) muss eindeutig definiert und dokumentiert werden.',
      priority: 'Hoch',
      tasks: [
        'Umgangsrichtlinien formulieren',
        'Freigabe von der GL einholen',
        'Mitarbeiter unterweisen',
        'Regelmäßige Kontrollen definieren',
      ],
    },
    partial: {
      title: 'Ergänze vorhandene Dokumente um Praxisbeispiele',
      description:
        'Die bestehenden Regelungen müssen um praxisnahe Beispiele ergänzt und Schulungen durchgeführt werden.',
      priority: 'Mittel',
      tasks: [
        'Dokumente sichten',
        'Praxisbeispiele erarbeiten',
        'Mitarbeiterschulung planen',
      ],
    },
  },
  'ORG.D5': {
    no: {
      title: 'Implementiere eine Standard-Verschlüsselung für alle Systeme',
      description:
        'Daten müssen generell verschlüsselt abgelegt werden (z.B. BitLocker, FileVault, Datenbankverschlüsselung).',
      priority: 'Hoch',
      tasks: [
        'Verschlüsselungslösung auswählen',
        'Systeme konfigurieren',
        'Richtlinien anpassen',
        'Mitarbeiter informieren',
      ],
    },
    partial: {
      title: 'Prüfe unverschlüsselte Bereiche und führe Verschlüsselung ein',
      description:
        'Es muss analysiert werden, welche Bereiche noch unverschlüsselt sind, und dort sukzessive Verschlüsselung eingeführt werden.',
      priority: 'Mittel',
      tasks: [
        'Bestandsaufnahme durchführen',
        'Implementierungsplan erstellen',
        'Fortschritt dokumentieren',
      ],
    },
  },
  'ORG.D6': {
    no: {
      title: 'Erstelle ein Rechtskataster und führe eine Rechtsberatung durch',
      description:
        'Die gesetzlichen Vorschriften müssen identifiziert und in einem Rechtskataster festgehalten werden.',
      priority: 'Hoch',
      tasks: [
        'Relevante Gesetze recherchieren',
        'Kataster erstellen',
        'Interne Kommunikation durchführen',
        'Compliance-Konzept definieren',
      ],
    },
    partial: {
      title: 'Aktiviere regelmäßige Updates bei Gesetzesänderungen',
      description:
        'Es müssen regelmäßige Updates und unternehmensweite Kommunikation bei gesetzlichen Änderungen sichergestellt werden.',
      priority: 'Mittel',
      tasks: [
        'Updateprozess definieren',
        'Verantwortliche Person benennen',
        'Informationswege etablieren',
      ],
    },
  },
  'ORG.D7': {
    no: {
      title: 'Führe eine umfassende Datenschutzprüfung durch',
      description:
        'Es muss eine umfassende Datenschutzprüfung (intern/extern) erstellt und ein Maßnahmenkatalog erarbeitet werden.',
      priority: 'Hoch',
      tasks: [
        'Audit durchführen',
        'Ergebnisse dokumentieren',
        'Maßnahmen ableiten',
        'Umsetzung nachhalten',
      ],
    },
    partial: {
      title: 'Erstelle eine Lückenanalyse (Gap-Analyse)',
      description:
        'Eine Gap-Analyse muss erstellt und gezielt die fehlenden Punkte abgearbeitet werden.',
      priority: 'Mittel',
      tasks: [
        'Ist-Soll-Vergleich durchführen',
        'Maßnahmen definieren',
        'Prioritäten setzen',
      ],
    },
  },
  'ORG.D8': {
    no: {
      title: 'Etabliere einen automatisierten Löschprozess',
      description:
        'Nach Ablauf der Aufbewahrungsfristen müssen Daten automatisiert gelöscht werden (z.B. via DMS).',
      priority: 'Hoch',
      tasks: [
        'Löschkonzept entwickeln',
        'Technische Lösung einführen',
        'Verantwortliche benennen',
        'Protokollierung aufsetzen',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Prüfschritte in den Löschworkflows',
      description:
        'Die vorhandenen Löschworkflows müssen um fehlende Prüfschritte und Freigabeprozesse ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Workflows analysieren',
        'Fehlende Schritte ergänzen',
        'Regelmäßige Kontrollen definieren',
      ],
    },
  },
  'ORG.D9': {
    no: {
      title:
        'Prüfe regelmäßig alle Webinhalte auf mögliche personenbezogene Daten',
      description:
        'Um unerlaubte Veröffentlichungen zu vermeiden, müssen alle Webinhalte laufend kontrolliert werden.',
      priority: 'Mittel',
      tasks: [
        'Webseiten-Checkliste erstellen',
        'Regelmäßige Scans durchführen',
        'Auffälligkeiten dokumentieren',
        'Zeitnahe Entfernung veranlassen',
      ],
    },
    partial: {
      title:
        'Hole Einwilligungen nachträglich ein und entferne nicht genehmigte Daten',
      description:
        'Die Einwilligungen betroffener Personen müssen eingeholt und Daten ohne Einwilligung entfernt werden.',
      priority: 'Hoch',
      tasks: [
        'Betroffene identifizieren',
        'Einwilligungen einfordern',
        'Webinhalte aktualisieren',
      ],
    },
  },
  'ORG.S1': {
    no: {
      title: 'Starte ein regelmäßiges Schulungsprogramm',
      description:
        'Ein Schulungsprogramm zu potenziellen Gefahren (z.B. Phishing, Malware) muss eingeführt werden.',
      priority: 'Hoch',
      tasks: [
        'Schulungskonzept entwickeln',
        'Termine planen',
        'Materialien erstellen',
        'Erfolgskontrolle durchführen',
      ],
    },
    partial: {
      title: 'Erhöhe Frequenz und Varianz der Phishing-Tests',
      description:
        'Regelmäßige und abwechslungsreiche Phishing-Tests müssen eingeführt und ausgewertet werden.',
      priority: 'Mittel',
      tasks: [
        'Testplan erstellen',
        'Ergebnisse analysieren',
        'Berichte teilen',
      ],
    },
  },
  'ORG.S2': {
    no: {
      title: 'Erstelle Basisrichtlinien für den sicheren Umgang mit IT-Mitteln',
      description:
        'Richtlinien zu E-Mail-Nutzung, Passwortregeln, Internetgebrauch etc. müssen erstellt und verbindlich gemacht werden.',
      priority: 'Hoch',
      tasks: [
        'Richtlinien formulieren',
        'Genehmigung einholen',
        'Rollout im Unternehmen',
        'Kontrollmechanismen definieren',
      ],
    },
    partial: {
      title:
        'Überarbeite die vorhandenen Richtlinien und führe Schulungen durch',
      description:
        'Die vorhandenen Richtlinien müssen vereinfacht, aktualisiert und den Mitarbeitern erklärt werden.',
      priority: 'Mittel',
      tasks: [
        'Dokumente sichten',
        'Inhalt vereinfachen',
        'Schulungsunterlagen erstellen',
      ],
    },
  },

  'TEC.N1': {
    no: {
      title: 'Erstelle eine vollständige Netzwerk-Dokumentation',
      description:
        'Eine ausführliche Dokumentation (Netzwerkpläne, Systemübersichten, Zugriffsrechte) muss angefertigt werden.',
      priority: 'Hoch',
      tasks: [
        'Netzwerk-Topologie erheben',
        'Systeminventar erstellen',
        'Zugriffsrechte festhalten',
        'Dokumentation freigeben',
      ],
    },
    partial: {
      title: 'Aktualisiere vorhandene Pläne und ergänze fehlende Details',
      description:
        'Vorhandene Netzwerkpläne müssen aktualisiert und mit IP-Bereichen, VLAN-Zuordnung etc. ergänzt werden.',
      priority: 'Mittel',
      tasks: [
        'Dokumentation prüfen',
        'Fehlende Infos erfassen',
        'Versionierung sicherstellen',
      ],
    },
  },
  'TEC.N2': {
    no: {
      title: 'Führe ein Versionsmanagement ein',
      description:
        'Ein formales Versionsmanagement muss etabliert werden, um Dokumentenaktualisierungen durchzuführen und nachzuverfolgen.',
      priority: 'Hoch',
      tasks: [
        'Versionskontrolle definieren',
        'Änderungsprotokoll einführen',
        'Verantwortliche benennen',
        'Regelmäßige Reviews planen',
      ],
    },
    partial: {
      title: 'Beschleunige den Update-Zyklus',
      description:
        'Der Update-Zyklus für IT-Dokumente muss erhöht und Review-Termine festgelegt werden (z.B. halbjährlich).',
      priority: 'Mittel',
      tasks: [
        'Zyklus definieren',
        'Review-Termine einplanen',
        'Dokumentation steuern',
      ],
    },
  },
  'TEC.N3': {
    no: {
      title: 'Lege Zugriffsberechtigungen in einem Rollenmodell fest',
      description:
        'Dokumentationen dürfen nur für Berechtigte zugänglich sein, basierend auf einem klaren Rollenmodell.',
      priority: 'Hoch',
      tasks: [
        'Rollenmodell definieren',
        'Berechtigungen vergeben',
        'Zugriffsrechte kontrollieren',
        'Regelmäßige Audits durchführen',
      ],
    },
    partial: {
      title: 'Prüfe bestehende Zugriffsrechte',
      description:
        'Vorhandene Freigaben müssen geprüft und unnötige Berechtigungen entzogen werden.',
      priority: 'Mittel',
      tasks: [
        'Aktuelle Rechte analysieren',
        'Unnötige Freigaben entfernen',
        'Änderungen dokumentieren',
      ],
    },
  },
  'TEC.N4': {
    no: {
      title:
        'Stelle sicher, dass jeder externe Zugriff nur mit 2FA möglich ist',
      description:
        'Für jedes VPN, RDP oder Cloud-System muss 2FA verpflichtend eingerichtet werden.',
      priority: 'Kritisch',
      tasks: [
        'Alle Systeme erfassen',
        '2FA-Lösung integrieren',
        'User schulen',
        'Funktionstests durchführen',
      ],
    },
    partial: {
      title: 'Vervollständige die 2FA-Implementierung für alle Anwendungen',
      description:
        'Noch nicht abgedeckte Anwendungen müssen zügig um 2FA erweitert werden.',
      priority: 'Hoch',
      tasks: [
        'Lückenanalyse durchführen',
        'Implementierungsplan erstellen',
        'Rollout steuern',
      ],
    },
  },
  'TEC.N5': {
    no: {
      title: 'Segmentiere das Netzwerk in Zonen',
      description:
        'DMZ, internes Netz, Gast-WLAN und Admin-Netz müssen klar getrennt werden, um Angriffsflächen zu reduzieren.',
      priority: 'Hoch',
      tasks: [
        'Segmentierungsplan entwickeln',
        'VLANs definieren',
        'Zugriffsregeln konfigurieren',
        'Funktionsprüfung durchführen',
      ],
    },
    partial: {
      title: 'Überprüfe und optimiere bestehende Segmentierung',
      description:
        'Die bestehende Segmentierung (z.B. VLAN-Konfiguration) muss überprüft und an Best Practices angepasst werden.',
      priority: 'Mittel',
      tasks: [
        'VLAN-Struktur analysieren',
        'Optimierungspotenzial erfassen',
        'Änderungen umsetzen',
      ],
    },
  },
  'TEC.N6': {
    no: {
      title:
        'Beauftrage unabhängige Dritte für regelmäßige Netzwerk-Sicherheitstests',
      description:
        'Externe Penetrationstests müssen durchgeführt werden, um Schwachstellen zu identifizieren.',
      priority: 'Hoch',
      tasks: [
        'Dienstleister evaluieren',
        'Testumfang festlegen',
        'Reports analysieren',
        'Maßnahmen umsetzen',
      ],
    },
    partial: {
      title: 'Erweitere den Prüfungsumfang',
      description:
        'Der Prüfungsumfang muss auf Social-Engineering, Wireless-Tests etc. ausgedehnt und Prüfintervalle verkürzt werden.',
      priority: 'Mittel',
      tasks: [
        'Zusätzliche Testbereiche definieren',
        'Intervall anpassen',
        'Protokolle archivieren',
      ],
    },
  },
  'TEC.N7': {
    no: {
      title: 'Führe ein Hardening-Framework ein',
      description:
        'Alle IT-Systeme müssen nach einem Hardening-Standard (z.B. CIS Benchmarks) konfiguriert und geprüft werden.',
      priority: 'Hoch',
      tasks: [
        'Framework auswählen',
        'Baseline konfigurieren',
        'Stichprobenkontrollen durchführen',
        'Dokumentation pflegen',
      ],
    },
    partial: {
      title: 'Aktualisiere Hardening-Standards regelmäßig',
      description:
        'Hardening-Standards müssen ständig aktualisiert und stichprobenartig überprüft werden.',
      priority: 'Mittel',
      tasks: [
        'Neue Benchmarks prüfen',
        'Änderungen implementieren',
        'Protokolle führen',
      ],
    },
  },
  'TEC.N8': {
    no: {
      title: 'Stelle auf WPA2 oder WPA3 um und sichere Passwörter/Zertifikate',
      description:
        'WLAN muss mindestens WPA2 (besser WPA3) nutzen, um angemessene Verschlüsselung zu gewährleisten.',
      priority: 'Hoch',
      tasks: [
        'Access Points konfigurieren',
        'Starke Passwörter oder Zertifikate festlegen',
        'Regelmäßige Sicherheitschecks durchführen',
      ],
    },
    partial: {
      title: 'Überprüfe alle Access Points auf einheitliche Verschlüsselung',
      description:
        'Alle Access Points müssen regelmäßig auf korrekte Verschlüsselung geprüft und vereinheitlicht werden.',
      priority: 'Mittel',
      tasks: [
        'Access Points scannen',
        'Konfiguration abgleichen',
        'Abweichungen korrigieren',
      ],
    },
  },
  'TEC.N9': {
    no: {
      title: 'Richte ein getrenntes Gast- bzw. Mitarbeiter-WLAN ein',
      description:
        'Ein eigenes WLAN für Gäste oder Mitarbeitende ist einzurichten, um das interne Netz abzusichern.',
      priority: 'Mittel',
      tasks: [
        'WLAN-Netze definieren',
        'Firewall-Regeln anpassen',
        'Zugriffsrechte beschränken',
      ],
    },
    partial: {
      title: 'Prüfe die Isolation des bestehenden Gastnetzes',
      description:
        'Das vorhandene Gastnetz muss auf ausreichende Isolation kontrolliert und Einstellungen optimiert werden.',
      priority: 'Niedrig',
      tasks: [
        'Isolationskonzept überprüfen',
        'Konfiguration anpassen',
        'Regelmäßige Tests durchführen',
      ],
    },
  },

  'TEC.F1': {
    no: {
      title: 'Konfiguriere zentrale Firewalls mit klaren Regeln',
      description:
        'Firewall-Regeln müssen das Firmennetzwerk vor dem Internet schützen; inbound-/outbound-Regeln sind klar festzulegen.',
      priority: 'Hoch',
      tasks: [
        'Firewall aufsetzen',
        'Regelsätze definieren',
        'Sicherheitstests durchführen',
        'Dokumentation erstellen',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Filterregeln',
      description:
        'Fehlende oder veraltete Firewall-Regeln müssen ergänzt und regelmäßig auditiert werden.',
      priority: 'Mittel',
      tasks: [
        'Bestehende Regeln prüfen',
        'Lücken identifizieren',
        'Neue Regeln implementieren',
      ],
    },
  },
  'TEC.F2': {
    no: {
      title: 'Führe externe Review- und Audit-Verfahren durch',
      description:
        'Unabhängige Prüfungen müssen regelmäßig erfolgen, um Firewall-Konfigurationsfehler aufzudecken.',
      priority: 'Mittel',
      tasks: [
        'Externe Auditoren beauftragen',
        'Testkriterien definieren',
        'Ergebnisse auswerten',
        'Maßnahmen ableiten',
      ],
    },
    partial: {
      title: 'Erweitere den Prüfungsumfang und dokumentiere Findings',
      description:
        'Der Prüfungsumfang muss (z.B. halbjährlich statt jährlich) erweitert und alle Findings dokumentiert werden.',
      priority: 'Niedrig',
      tasks: [
        'Prüfintervall neu festlegen',
        'Protokollierung verbessern',
        'Fortschritt überwachen',
      ],
    },
  },
  'TEC.F3': {
    no: {
      title:
        'Erzwinge sofortige Passwortrichtlinienänderung für Firewall-Accounts',
      description:
        'Nur sichere Passwörter dürfen genutzt werden, und der Zugriff muss streng berechtigten Personen vorbehalten sein.',
      priority: 'Hoch',
      tasks: [
        'Passwortrichtlinie definieren',
        'Accounts überprüfen',
        'Zugriffsrollen schärfen',
        'Regelmäßige Kontrollen durchführen',
      ],
    },
    partial: {
      title:
        'Überarbeite Passwortrichtlinien und führe ein Rollen-Review durch',
      description:
        'Die Passwortrichtlinien für die Firewall müssen verstärkt und Zugänge regelmäßig überprüft werden.',
      priority: 'Mittel',
      tasks: [
        'Aktuelle Richtlinien prüfen',
        'Striktere Vorgaben setzen',
        'Rollen-Zugänge dokumentieren',
      ],
    },
  },
  'TEC.F4': {
    no: {
      title: 'Dokumentiere alle Änderungsprozesse im Change Management',
      description:
        'Es müssen ausreichende Prozesse für die Verwaltung der Firewall existieren, inkl. Freigabe- und Eskalationsstufen.',
      priority: 'Hoch',
      tasks: [
        'Change-Management-Prozess definieren',
        'Freigabestufen festlegen',
        'Verantwortliche benennen',
        'Protokollierung implementieren',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Schritte und führe Nachverfolgung ein',
      description:
        'Fehlende Prozessschritte (z.B. Testphase) müssen ergänzt und Firewall-Änderungen aktiv nachverfolgt werden.',
      priority: 'Mittel',
      tasks: [
        'Prozesslücken identifizieren',
        'Testphase implementieren',
        'Änderungsprotokolle auswerten',
      ],
    },
  },

  'TEC.R1': {
    no: {
      title: 'Entwickle ein Incident-Response-Konzept',
      description:
        'Ein Notfallkonzept mit klaren Rollen und Abläufen muss erstellt, inkl. Eskalationsplan.',
      priority: 'Kritisch',
      tasks: [
        'IR-Konzept entwerfen',
        'Rollen und Abläufe definieren',
        'Notfallkontakte benennen',
        'Dokumentation freigeben',
      ],
    },
    partial: {
      title: 'Erweitere das bestehende Konzept um Testübungen',
      description:
        'Das Konzept muss durch regelmäßige Übungen ergänzt und die Ergebnisse protokolliert werden.',
      priority: 'Hoch',
      tasks: [
        'Übungsszenarien definieren',
        'Termine planen',
        'Protokolle erstellen',
      ],
    },
  },
  'TEC.R2': {
    no: {
      title: 'Lege klare Rollen bei IT-Sicherheitsvorfällen fest',
      description:
        'Verantwortlichkeiten müssen eindeutig definiert sein (z.B. Incident Manager, Krisenstab).',
      priority: 'Hoch',
      tasks: [
        'Rollenmodell erstellen',
        'Zuständigkeiten dokumentieren',
        'Verantwortliche schulen',
        'Kommunikationswege festlegen',
      ],
    },
    partial: {
      title: 'Konkretisiere und benenne Stellvertreter für zentrale Rollen',
      description:
        'Bei Abwesenheit muss eine Vertretung klar benannt sein, um schnelle Reaktionen zu gewährleisten.',
      priority: 'Mittel',
      tasks: [
        'Stellvertreter identifizieren',
        'Übergabeprozesse definieren',
        'Abläufe testen',
      ],
    },
  },
  'TEC.R3': {
    no: {
      title: 'Erstelle einen Sofortmaßnahmenkatalog',
      description:
        'Ein Katalog an Sofortmaßnahmen (z.B. Systeme isolieren, Passwörter zurücksetzen) muss definiert und verteilt werden.',
      priority: 'Hoch',
      tasks: [
        'Checkliste anlegen',
        'Aufgaben zuweisen',
        'Verteilung an alle relevanten Personen',
        'Testdurchlauf planen',
      ],
    },
    partial: {
      title: 'Ergänze detailreiche Schritt-für-Schritt-Anweisungen',
      description:
        'Das vorhandene Konzept muss mit konkreten Anweisungen erweitert und verantwortliche Personen zugeordnet werden.',
      priority: 'Mittel',
      tasks: [
        'Schrittfolgen definieren',
        'Rollen festlegen',
        'Dokumentation freigeben',
      ],
    },
  },
  'TEC.R4': {
    no: {
      title: 'Führe mindestens halbjährliche Notfallübungen durch',
      description:
        'Der Notfallplan muss regelmäßig getestet und bei Bedarf angepasst werden.',
      priority: 'Hoch',
      tasks: [
        'Übungstermine festlegen',
        'Übungsszenarien planen',
        'Testergebnisse protokollieren',
        'Anpassungen umsetzen',
      ],
    },
    partial: {
      title: 'Erweitere den Testplan und integriere Lessons Learned',
      description:
        'Der bestehende Plan muss ergänzt und die Ergebnisse realer Vorfälle oder Übungen eingearbeitet werden.',
      priority: 'Mittel',
      tasks: [
        'Testplan überprüfen',
        'Lessons Learned dokumentieren',
        'Fortlaufende Optimierung',
      ],
    },
  },
  'TEC.R5': {
    no: {
      title: 'Verteile eine einheitliche Antivirus-Lösung zentral',
      description:
        'Alle Clients benötigen eine aktuelle Antivirus-Lösung mit automatisierten Updates und zentraler Verwaltung.',
      priority: 'Hoch',
      tasks: [
        'Lösung auswählen',
        'Zentrales Deployment einrichten',
        'Update-Server konfigurieren',
        'Mitarbeiter informieren',
      ],
    },
    partial: {
      title: 'Identifiziere nicht abgedeckte oder veraltete Clients',
      description:
        'Es muss überprüft werden, welche Clients keinen aktuellen Virenschutz haben, und diese aktualisiert werden.',
      priority: 'Mittel',
      tasks: [
        'Inventar erstellen',
        'Veraltete Installationen erneuern',
        'Statusmonitoring implementieren',
      ],
    },
  },
  'TEC.R6': {
    no: {
      title: 'Integriere einen Server-Antivirus mit Echtzeit-Scanning',
      description:
        'Alle Server benötigen einen aktuellen Virenschutz und regelmäßige Updates.',
      priority: 'Hoch',
      tasks: [
        'Server-Scanner auswählen',
        'Echtzeit-Modus aktivieren',
        'Update-Zyklen definieren',
        'Monitoring implementieren',
      ],
    },
    partial: {
      title: 'Prüfe regelmäßig den Update-Status aller Server',
      description:
        'Alle Server müssen auf Aktualität hin kontrolliert und Lücken in Test-/Dev-Umgebungen geschlossen werden.',
      priority: 'Mittel',
      tasks: [
        'Update-Protokoll sichten',
        'Fehlende Patches installieren',
        'Umfassende Berichterstattung',
      ],
    },
  },
  'TEC.R7': {
    no: {
      title: 'Setze ein regelmäßiges Vulnerability-Scanning auf',
      description:
        'Es muss ein periodisches Verfahren (z.B. wöchentlich/monatlich) zum Erkennen von Schwachstellen existieren.',
      priority: 'Hoch',
      tasks: [
        'Scanning-Tool wählen',
        'Scan-Frequenz definieren',
        'Ergebnisse analysieren',
        'Maßnahmenplan umsetzen',
      ],
    },
    partial: {
      title: 'Erweitere die bestehenden Scans auf alle Systeme',
      description:
        'Das bereits vorhandene Verfahren muss auf sämtliche IT-Systeme ausgeweitet und systematisch ausgewertet werden.',
      priority: 'Mittel',
      tasks: [
        'Systemliste vervollständigen',
        'Scan-Konfiguration anpassen',
        'Ergebnisse dokumentieren',
      ],
    },
  },
  'TEC.R8': {
    no: {
      title: 'Richte physische Schutzmaßnahmen (Zutrittsregelung etc.) ein',
      description:
        'Zutrittsregelungen und Clear-Desk-Policy müssen eingeführt und überwacht werden.',
      priority: 'Hoch',
      tasks: [
        'Zutrittssystem einbauen',
        'Clear-Desk-Policy dokumentieren',
        'Regelmäßige Kontrollen durchführen',
        'Mitarbeiter schulen',
      ],
    },
    partial: {
      title:
        'Ergänze fehlende Komponenten wie Alarmanlage oder Videoüberwachung',
      description:
        'Vorhandene physische Sicherheitsmaßnahmen müssen erweitert und die Richtlinien regelmäßig geprüft werden.',
      priority: 'Mittel',
      tasks: [
        'Sicherheitskonzept sichten',
        'Lücken identifizieren',
        'Erweiterungen umsetzen',
      ],
    },
  },
  'TEC.R9': {
    no: {
      title: 'Führe ein tägliches Backup-Konzept ein',
      description:
        'Alle wichtigen Systeme müssen in ein regelmäßiges Backup eingebunden und der Status überwacht werden.',
      priority: 'Hoch',
      tasks: [
        'Backup-Plan erstellen',
        'Backup-Zeitfenster definieren',
        'Automatisierte Reports einrichten',
        'Wiederherstellung testen',
      ],
    },
    partial: {
      title: 'Integriere fehlende Systeme in den Backup-Plan',
      description:
        'Es muss geprüft werden, welche Systeme nicht gesichert werden, und diese in das Backup-Konzept aufnehmen.',
      priority: 'Mittel',
      tasks: [
        'Systeminventur durchführen',
        'Konfiguration anpassen',
        'Abdeckung überwachen',
      ],
    },
  },
  'TEC.R10': {
    no: {
      title: 'Plane regelmäßige Wiederherstellungstests',
      description:
        'Die Funktionsfähigkeit der Backups muss durch regelmäßige Restore-Übungen (z.B. vierteljährlich) verifiziert werden.',
      priority: 'Mittel',
      tasks: [
        'Testplan entwickeln',
        'Testsystem aufsetzen',
        'Testergebnisse dokumentieren',
        'Nachbereitung durchführen',
      ],
    },
    partial: {
      title: 'Erhöhe die Testfrequenz und definiere Erfolgsindikatoren',
      description:
        'Die Testfrequenz muss angehoben und klare KPIs (z.B. Restore-Zeit) festgelegt werden.',
      priority: 'Niedrig',
      tasks: [
        'Testintervalle verkürzen',
        'KPIs definieren',
        'Regelmäßige Berichte erstellen',
      ],
    },
  },
  'TEC.R11': {
    no: {
      title: 'Richte ein Offsite-Backup ein',
      description:
        'Eine externe Aufbewahrung der Datensicherung ist nötig (Cloud oder andere geografische Standorte).',
      priority: 'Hoch',
      tasks: [
        'Cloud-Lösung prüfen',
        'Vertragliche Grundlagen klären',
        'Backup-Verschlüsselung sicherstellen',
        'Wiederherstellung testen',
      ],
    },
    partial: {
      title: 'Prüfe die Aktualität der externen Lagerung',
      description:
        'Das bestehende externe Lagerkonzept muss überprüft und ggf. an unterschiedliche Standorte verteilt werden.',
      priority: 'Mittel',
      tasks: [
        'Lagerstandorte evaluieren',
        'Backup-Pläne abgleichen',
        'Sicherheitsstandards kontrollieren',
      ],
    },
  },
  'TEC.R12': {
    no: {
      title: 'Definiere im DMS genaue Lösch-/Aufbewahrungsfristen',
      description:
        'Alle Dokumententypen benötigen definierte Aufbewahrungsfristen und ein automatisiertes Löschverfahren.',
      priority: 'Hoch',
      tasks: [
        'Fristen pro Dokumententyp ermitteln',
        'DMS konfigurieren',
        'Löschprozess testen',
        'Regelmäßige Audits durchführen',
      ],
    },
    partial: {
      title:
        'Schließe fehlende Dokumententypen in das Aufbewahrungskonzept ein',
      description:
        'Das Aufbewahrungskonzept muss erweitert und automatisierte Löschprozesse optimiert werden.',
      priority: 'Mittel',
      tasks: [
        'Fehlende Dokumententypen identifizieren',
        'Konzept aktualisieren',
        'Automatisierung überprüfen',
      ],
    },
  },
  'TEC.R13': {
    no: {
      title: 'Implementiere ein zentrales Update-Scanning-Tool',
      description:
        'Ein Tool (WSUS, Software Deployment) muss automatisiert alle Systeme scannen und Updates melden.',
      priority: 'Hoch',
      tasks: [
        'Toolauswahl treffen',
        'Scan-Intervalle festlegen',
        'Mitarbeiter informieren',
        'Reports auswerten',
      ],
    },
    partial: {
      title: 'Erweitere die Update-Prüfungen auf alle Geräte',
      description:
        'Bestehende Prüfungen müssen auf Peripheriegeräte, Server und Drucker ausgeweitet werden.',
      priority: 'Mittel',
      tasks: [
        'Geräteliste vervollständigen',
        'Monitoring anpassen',
        'Reporting bündeln',
      ],
    },
  },
  'TEC.R14': {
    no: {
      title: 'Erstelle einen festen Patch-Zeitplan mit Deadlines',
      description:
        'Updates müssen in einem festen Turnus (z.B. monatlich) ausgerollt und verpflichtend installiert werden.',
      priority: 'Hoch',
      tasks: [
        'Patch-Zeitplan definieren',
        'Automatisierte Rollouts einrichten',
        'Erfolgskontrolle durchführen',
        'User-Kommunikation sicherstellen',
      ],
    },
    partial: {
      title: 'Analysiere Patch-Lücken und automatisiere den Update-Prozess',
      description:
        'Patch-Lücken müssen identifiziert und die Installation zeitnah automatisiert werden, um Sicherheit zu gewährleisten.',
      priority: 'Mittel',
      tasks: [
        'Lückenanalyse durchführen',
        'Update-Fenster planen',
        'Fortlaufendes Monitoring',
      ],
    },
  },

  'TEC.S1': {
    no: {
      title:
        'Aktiviere und konfiguriere Logging für alle sicherheitsrelevanten Systeme',
      description:
        'Fehler müssen gemeldet werden; die Logs sind zentral zu sammeln und zu überwachen.',
      priority: 'Hoch',
      tasks: [
        'Logging-Tool auswählen',
        'Systeme anbinden',
        'Benachrichtigungen einrichten',
        'Log-Speicher überwachen',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Systeme im Logging-Konzept',
      description:
        'Alle Netzwerkgeräte und Sicherheitskomponenten müssen ins zentrale Logging integriert werden.',
      priority: 'Mittel',
      tasks: [
        'Bestandsaufnahme durchführen',
        'Log-Level anpassen',
        'Alarmgrenzen definieren',
      ],
    },
  },
  'TEC.S2': {
    no: {
      title: 'Erhöhe das Log-Level zur lückenlosen Ereigniserfassung',
      description:
        'Der Umfang und die Qualität der Logdateien müssen erhöht werden, um den Ursprung eines Ereignisses nachvollziehen zu können.',
      priority: 'Hoch',
      tasks: [
        'Log-Level definieren',
        'Speicherbedarf kalkulieren',
        'Konfiguration anpassen',
        'Datenschutz beachten',
      ],
    },
    partial: {
      title: 'Prüfe vorhandene Log-Details und verbessere sie',
      description:
        'Die bestehenden Logs müssen erweitert (z.B. Zeitstempel, User-ID), um forensische Analysen zu ermöglichen.',
      priority: 'Mittel',
      tasks: [
        'Detailgrad evaluieren',
        'Neue Felder hinzufügen',
        'Auswertungstools konfigurieren',
      ],
    },
  },
  'TEC.S3': {
    no: {
      title: 'Implementiere ein zentrales Data-Governance-Tool',
      description:
        'Die Verarbeitung personenbezogener Daten muss jederzeit nachvollziehbar sein (Zugriffe, Änderungen).',
      priority: 'Hoch',
      tasks: [
        'Tool evaluieren',
        'Konfiguration durchführen',
        'Audit-Logs aktivieren',
        'Regelmäßige Kontrollen einplanen',
      ],
    },
    partial: {
      title:
        'Schärfe das Protokollierungskonzept und integriere Zugriffsnachweise',
      description:
        'Das vorhandene Konzept muss um zusätzliche Protokollierung und regelmäßige Audits erweitert werden.',
      priority: 'Mittel',
      tasks: [
        'Vorhandene Logs analysieren',
        'Zugriffsnachweise ergänzen',
        'Audit-Prozesse dokumentieren',
      ],
    },
  },
  'TEC.S4': {
    no: {
      title:
        'Führe ein zertifiziertes Löschverfahren oder professionelle Entsorgung ein',
      description:
        'Bei der Entsorgung von IT-Infrastruktur müssen die Daten unwiderruflich gelöscht (z.B. nach DoD-Standard) werden.',
      priority: 'Hoch',
      tasks: [
        'Löschverfahren auswählen',
        'Service-Provider evaluieren',
        'Protokollierung etablieren',
        'Mitarbeiter schulen',
      ],
    },
    partial: {
      title: 'Ergänze fehlende Dokumentation und teste Löschverfahren',
      description:
        'Das vorhandene Entsorgungskonzept muss dokumentiert und die Wirksamkeit der Löschverfahren regelmäßig geprüft werden.',
      priority: 'Mittel',
      tasks: [
        'Dokumentation erweitern',
        'Testläufe planen',
        'Protokolle analysieren',
      ],
    },
  },
  'TEC.S5': {
    no: {
      title: 'Implementiere ein MDM-System (z.B. Intune) für BYOD',
      description:
        'Sicherheitsrichtlinien (Passwörter, Verschlüsselung) müssen auf privaten Geräten durchgesetzt werden.',
      priority: 'Hoch',
      tasks: [
        'MDM-Lösung auswählen',
        'Policies definieren',
        'Geräte registrieren',
        'Rollout kommunizieren',
      ],
    },
    partial: {
      title:
        'Dehne die vorhandenen MDM-Richtlinien auf alle Mitarbeitenden aus',
      description:
        'Die vorhandene Mobile-Device-Management-Lösung muss auf weitere Gerätetypen und Nutzende ausgedehnt werden.',
      priority: 'Mittel',
      tasks: [
        'IST-Stand analysieren',
        'Fehlende Geräte erfassen',
        'Richtlinienverteilung ausweiten',
      ],
    },
  },
  'TEC.S6': {
    no: {
      title: 'Integriere ein professionelles Spam- und Malwareschutz-Tool',
      description:
        'Schädliche Mails und Spams müssen automatisiert gefiltert und Signaturen regelmäßig aktualisiert werden.',
      priority: 'Hoch',
      tasks: [
        'Filterlösung evaluieren',
        'Regelmäßige Updates einrichten',
        'Quarantäne-Management konfigurieren',
        'Reportings aktivieren',
      ],
    },
    partial: {
      title:
        'Erweitere die Filterregeln und führe Testmails zur Feinjustierung durch',
      description:
        'Die bereits vorhandenen Filter müssen verfeinert und kontinuierlich optimiert werden.',
      priority: 'Mittel',
      tasks: [
        'Regelsätze überprüfen',
        'Keyword-Filter ergänzen',
        'Testmails senden',
        'Ergebnisse analysieren',
      ],
    },
  },
};
