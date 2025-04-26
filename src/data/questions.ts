import { Question, NistCategory } from '../types/assessment';

export const questions: Question[] = [
  {
    id: 'ORG.V1',
    category: 'Identify' as NistCategory,
    text: 'Ist in Ihrem Betrieb bestimmt, wer für Informationssicherheit verantwortlich ist?',
    description: 'Prüfen Sie, ob eine spezifische Person oder Rolle offiziell benannt ist (z.B. CISO, IT-Leiter).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.V2',
    category: 'Identify' as NistCategory,
    text: 'Ist in Ihrem Betrieb bestimmt, wer für Informationssicherheit stellvertretend verantwortlich ist?',
    description: 'Stellen Sie sicher, dass eine Vertretungsregelung für den Fall der Abwesenheit des Hauptverantwortlichen existiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.V3',
    category: 'Identify' as NistCategory,
    text: 'Sind die Aufgaben der Informationssicherheits-Verantwortlichen schriftlich festgehalten?',
    description: 'Überprüfen Sie, ob eine formale Dokumentation (z.B. Stellenbeschreibung, Richtlinie) die Aufgaben und Befugnisse klar definiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.V4',
    category: 'Identify' as NistCategory,
    text: 'Hat die verantwortliche Person die notwendige hierarchische Stellung und entsprechende Kompetenzen um Security-Massnahmen umzusetzen?',
    description: 'Bewerten Sie, ob die Position des Verantwortlichen ausreichend Autorität und Einfluss im Unternehmen hat.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.I1',
    category: 'Protect' as NistCategory, // Note: Excel Category 'IT-Sicherheit' maps broadly; NIST mapping might vary. Protect/Detect fit well here.
    text: 'Wird die Informationssicherheit regelmässig von internen oder externen Stellen kontrolliert und dokumentiert?',
    description: 'Suchen Sie nach Nachweisen für regelmässige Audits, Reviews oder Penetrationstests und deren Dokumentation.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.I2',
    category: 'Protect' as NistCategory, // Part of the improvement cycle
    text: 'Werden Mängel dokumentiert?',
    description: 'Prüfen Sie, ob ein Prozess zur Erfassung und Nachverfolgung von festgestellten Sicherheitsschwachstellen existiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.I3',
    category: 'Protect' as NistCategory, // KVP/PDCA relates to improving protection
    text: 'Findet ein kontinuierlicher Verbesserungsprozess statt?',
    description: 'Bewerten Sie, ob Massnahmen zur Behebung von Mängeln geplant, umgesetzt und deren Wirksamkeit überprüft wird (PDCA-Zyklus).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.I4',
    category: 'Identify' as NistCategory,
    text: 'Besteht eine aktuelle schriftliche Liste der relevanten IT-Risiken für die Unternehmung?',
    description: 'Überprüfen Sie die Existenz eines aktuellen IT-Risikoregisters oder einer ähnlichen Dokumentation.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.I5',
    category: 'Identify' as NistCategory, // Governance Aspect
    text: 'Nimmt der Verwaltungsrat oder die Geschäftsleitung die IT-Risiken bewusst zur Kenntnis?',
    description: 'Suchen Sie nach Nachweisen (z.B. Protokolle), dass die IT-Risiken auf Management-Ebene behandelt und bewertet werden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R1',
    category: 'Protect' as NistCategory, // Policies are protective controls
    text: 'Sind Richtlinien für alle Mitarbeiter verständlich formuliert?',
    description: 'Bewerten Sie die Klarheit und Zugänglichkeit der Sicherheitsrichtlinien für die Zielgruppe (alle Mitarbeiter).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R2',
    category: 'Protect' as NistCategory, // Keeping policies up-to-date
    text: 'Werden die Richtlinien mindestens alle 3 Jahre aktualisiert?',
    description: 'Prüfen Sie das Datum der letzten Überarbeitung und den Prozess zur regelmässigen Aktualisierung der Richtlinien.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R3',
    category: 'Protect' as NistCategory, // Principle of Least Privilege
    text: 'Wurden lokale Administratorenrechte den Benutzern entzogen?',
    description: 'Überprüfen Sie, ob Standardbenutzer ohne administrative Berechtigungen auf ihren Arbeitsplatzrechnern arbeiten.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R4',
    category: 'Protect' as NistCategory, // Access Control
    text: 'Ist eine Zwei-Faktoren-Authentifizierung auf allen Systemen, die von extern erreichbar sind, integriert?',
    description: 'Verifizieren Sie den Einsatz von MFA/2FA für *alle* externen Zugänge (VPN, Webmail, Cloud-Dienste etc.).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R5',
    category: 'Protect' as NistCategory, // Access Control - Password Complexity
    text: 'Beinhaltet Ihre Passwortrichtlinie mindestens zwölf Zeichen, eine Ziffer, einen Gross- und einen Kleinbuchstaben und ein Sonderzeichen?',
    description: 'Prüfen Sie die dokumentierte Passwortrichtlinie auf die Einhaltung dieser spezifischen Komplexitätsanforderungen.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R6',
    category: 'Protect' as NistCategory, // Policy Enforcement
    text: 'Werden die Passwortrichtlinien überall konsequent eingehalten?',
    description: 'Bewerten Sie, ob die Passwortrichtlinie technisch erzwungen wird und für alle Systeme und Benutzer gilt.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R7',
    category: 'Protect' as NistCategory, // Data Security Policy
    text: 'Hat Ihr Unternehmen Richtlinien wie mit Daten umzugehen ist?',
    description: 'Prüfen Sie die Existenz von Richtlinien zur Datenklassifizierung, -handhabung, -speicherung und -weitergabe.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R8',
    category: 'Protect' as NistCategory, // Brute-Force Protection
    text: 'Wird bei mehreren Fehlgeschlagenen Anmeldeversuchen die Wartezeit zwischen den Versuchen erhöht?',
    description: 'Überprüfen Sie, ob Account-Lockout-Mechanismen oder Verzögerungen nach fehlgeschlagenen Logins konfiguriert sind.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R9',
    category: 'Protect' as NistCategory, // Overall policy enforcement and review
    text: 'Werden diese Richtlinien und Cybersecurity-Massnahmen konsequent umgesetzt und regelmässig überprüft?',
    description: 'Bewerten Sie die allgemeine Durchsetzung der Sicherheitsvorgaben und die Regelmässigkeit von Kontrollen/Audits.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R10',
    category: 'Protect' as NistCategory, // Principle of Least Privilege (Admin rights)
    text: 'Haben nur notwendige Benutzer Administratorenrechte auf Ihren Systemen?',
    description: 'Prüfen Sie, ob administrative Berechtigungen restriktiv und nur nach Notwendigkeit vergeben werden (Least Privilege).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R11',
    category: 'Protect' as NistCategory, // Third-Party Access Control & Monitoring
    text: 'Werden Fernwartungszugriffe überwacht und protokolliert?',
    description: 'Stellen Sie sicher, dass Zugriffe durch Externe (z.B. Lieferanten) kontrolliert, protokolliert und idealerweise überwacht werden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.R12',
    category: 'Protect' as NistCategory, // Password Management Tool Usage
    text: 'Wird ein Passwortmanager verwendet, um die Passwortqualität hochzuhalten?',
    description: 'Prüfen Sie, ob ein zentraler Passwortmanager im Unternehmen empfohlen oder vorgeschrieben wird.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D1',
    category: 'Protect' as NistCategory, // Data Privacy Governance (can also map to Identify)
    text: 'Ist in Ihrem Betrieb bestimmt, wer für Datenschutz verantwortlich ist?',
    description: 'Prüfen Sie, ob eine spezifische Person oder Rolle offiziell als Datenschutzbeauftragter oder -verantwortlicher benannt ist.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D2',
    category: 'Protect' as NistCategory, // Data Privacy Governance
    text: 'Sind die Aufgaben der Datenschutz-Verantwortlichen schriftlich festgehalten?',
    description: 'Überprüfen Sie, ob eine formale Dokumentation (z.B. Stellenbeschreibung) die Aufgaben und Befugnisse im Datenschutz klar definiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D3',
    category: 'Protect' as NistCategory, // Data Security - Classification
    text: 'Klassifiziert Ihr Unternehmen Daten? (INTERN, VERTRAULICH, ÖFFENTLICH)',
    description: 'Prüfen Sie, ob ein System zur Einstufung von Daten nach Vertraulichkeit existiert und angewendet wird.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D4',
    category: 'Protect' as NistCategory, // Data Security - Handling Procedures
    text: 'Ist der Umgang mit klassifizierten Daten klar definiert?',
    description: 'Stellen Sie sicher, dass es dokumentierte Regeln gibt, wie Daten je nach Klassifizierung gespeichert, übertragen und vernichtet werden müssen.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D5',
    category: 'Protect' as NistCategory, // Data Security - Encryption at Rest
    text: 'Werden Daten generell verschlüsselt abgelegt?',
    description: 'Bewerten Sie den Einsatz von Verschlüsselung für gespeicherte Daten (Encryption at Rest), insbesondere für sensitive Daten.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D6',
    category: 'Identify' as NistCategory, // Compliance & Legal Requirements
    text: 'Sind dem Unternehmen gesetzliche Vorschriften bezüglich Datenspeicherung und -verbreitung bewusst?',
    description: 'Prüfen Sie, ob Kenntnisse über relevante Gesetze (z.B. DSGVO, nDSG, branchenspezifische Vorgaben) vorhanden sind.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D7',
    category: 'Protect' as NistCategory, // Compliance Implementation
    text: 'Werden die aktuellen Vorschriften zum Datenschutz konsequent und korrekt umgesetzt?',
    description: 'Bewerten Sie die tatsächliche Umsetzung der Datenschutzanforderungen im Betriebsalltag.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D8',
    category: 'Protect' as NistCategory, // Data Lifecycle Management - Deletion
    text: 'Existiert in ihrem Betrieb einen Prozess für Datenlöschung nach der Aufbewahrungsfrist?',
    description: 'Überprüfen Sie, ob ein definierter und dokumentierter Prozess zur sicheren Löschung von Daten nach Ablauf der gesetzlichen Fristen existiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.D9',
    category: 'Protect' as NistCategory, // Data Privacy - Consent Management
    text: 'Werden personenbezogene Daten auf Ihrer Webseite veröffentlicht? Falls ja, wurde die Einwilligung der betroffenen Personen eingeholt?',
    description: 'Prüfen Sie Webseiten und andere Veröffentlichungen auf personenbezogene Daten und die dazugehörige dokumentierte Einwilligung.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.S1',
    category: 'Protect' as NistCategory, // Security Awareness Training
    text: 'Werden Mitarbeiter auf potenzielle Gefahren regelmässig aufmerksam gemacht (z.B. durch Phishing Kampagnen)?',
    description: 'Suchen Sie nach Nachweisen für regelmässige Schulungen, Awareness-Kampagnen oder simulierte Phishing-Tests.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'ORG.S2',
    category: 'Protect' as NistCategory, // Acceptable Use Policy & Awareness
    text: 'Gibt es Richtlinien für den sicheren Umgang mit IT-Mittel (Computer, E-Mail, Internet) und werden die Mitarbeiter darüber informiert?',
    description: 'Prüfen Sie die Existenz einer Nutzungsrichtlinie (AUP) und wie deren Kenntnisnahme durch Mitarbeiter sichergestellt wird.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N1',
    category: 'Identify' as NistCategory, // Asset Management - Documentation
    text: 'Ist die IT-Infrastruktur ausführlich dokumentiert, damit Externe diese interpretieren können?',
    description: 'Bewerten Sie die Qualität und Verständlichkeit der Netzwerkpläne, Konfigurationsdokumente und Inventarlisten.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N2',
    category: 'Identify' as NistCategory, // Asset Management - Documentation Update
    text: 'Werden die Dokumente aktuell gehalten?',
    description: 'Prüfen Sie, ob ein Prozess zur regelmässigen Aktualisierung der IT-Dokumentation existiert und eingehalten wird.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N3',
    category: 'Protect' as NistCategory, // Access Control for Documentation
    text: 'Ist die Dokumentation nur für Berechtigte zugänglich?',
    description: 'Stellen Sie sicher, dass der Zugriff auf sensible IT-Dokumentationen auf autorisierte Personen beschränkt ist.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N4',
    category: 'Protect' as NistCategory, // Access Control - Same as ORG.R4, technical focus
    text: 'Ist eine Zwei-Faktor-Authentifizierung für alle externe Zugriffe konfiguriert?',
    description: 'Verifizieren Sie die technische Implementierung von MFA/2FA für alle von aussen erreichbaren Systeme und Dienste.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N5',
    category: 'Protect' as NistCategory, // Network Segmentation
    text: 'Ist das Netzwerk sinnvoll segmentiert?',
    description: 'Bewerten Sie, ob das Netzwerk in logische Zonen (VLANs, Subnetze, DMZ) unterteilt ist, um Datenflüsse zu kontrollieren.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N6',
    category: 'Detect' as NistCategory, // Vulnerability Scanning / Pen Testing
    text: 'Wird das interne Netzwerk regelmässig von externen Experten überprüft?',
    description: 'Suchen Sie nach Berichten von externen Sicherheitsüberprüfungen (z.B. Penetrationstests, Schwachstellenscans) des internen Netzes.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N7',
    category: 'Protect' as NistCategory, // System Hardening
    text: 'Sind die IT-Systeme so konfiguriert, dass eine möglichst geringe Exposition gegenüber Cyberangriffen besteht (System Hardening)?',
    description: 'Prüfen Sie, ob Massnahmen zur Härtung von Betriebssystemen und Anwendungen umgesetzt werden (unnötige Dienste deaktiviert etc.).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N8',
    category: 'Protect' as NistCategory, // Wireless Security
    text: 'Ist Ihr WLAN verschlüsselt und geschützt?',
    description: 'Überprüfen Sie die WLAN-Konfiguration auf starke Verschlüsselung (WPA2/WPA3) und sichere Authentifizierungsmethoden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.N9',
    category: 'Protect' as NistCategory, // Wireless Security - Segmentation
    text: 'Hat Ihr Unternehmen ein separates WLAN für Mitarbeitende und Beruflernende?',
    description: 'Prüfen Sie, ob separate WLANs (SSIDs), idealerweise in unterschiedlichen Netzsegmenten, für verschiedene Benutzergruppen (z.B. Mitarbeiter, Gäste, Lernende) existieren.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.F1',
    category: 'Protect' as NistCategory, // Firewall Rules
    text: 'Haben Sie Firewall-Regeln, welche das Unternehmensnetzwerk vor dem Internet schützt?',
    description: 'Überprüfen Sie die Existenz und Konfiguration einer Firewall mit Regeln, die den ein- und ausgehenden Verkehr kontrollieren (Default Deny).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.F2',
    category: 'Detect' as NistCategory, // Firewall Auditing
    text: 'Lässt Ihr Unternehmen Ihre Firewalls von Unabhängigen überprüfen?',
    description: 'Suchen Sie nach Nachweisen für regelmässige, unabhängige Überprüfungen der Firewall-Konfiguration und Regeln.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.F3',
    category: 'Protect' as NistCategory, // Firewall Access Control
    text: 'Werden sichere Passwörter für die Firewall genutzt und haben nur berechtigte Personen Zugriff?',
    description: 'Prüfen Sie die Passwortsicherheit und die Zugriffsberechtigungen für die Verwaltung der Firewall(s).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.F4',
    category: 'Protect' as NistCategory, // Firewall Change Management
    text: 'Sind alle Prozesse zur Verwaltung der Firewall ausreichend definiert?',
    description: 'Bewerten Sie, ob dokumentierte Prozesse für Änderungen an Firewall-Regeln (Change Management) existieren und befolgt werden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R1',
    category: 'Respond' as NistCategory, // Incident Response Planning
    text: 'Besteht ein Notfallkonzept im Falle eines IT-Sicherheitsvorfalls?',
    description: 'Überprüfen Sie die Existenz eines dokumentierten Incident Response Plans (IRP).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R2',
    category: 'Respond' as NistCategory, // Incident Response Team & Roles
    text: 'Sind Verantwortlichkeiten bei einem IT-Sicherheitsvorfall definiert?',
    description: 'Prüfen Sie, ob im Notfallkonzept klare Rollen und Verantwortlichkeiten für die Reaktion auf Vorfälle festgelegt sind.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R3',
    category: 'Respond' as NistCategory, // Incident Response Procedures
    text: 'Hat Ihr Unternehmen Sofortmassnahmen definiert im Falle eines IT-Sicherheitsvorfalls?',
    description: 'Bewerten Sie, ob der Notfallplan konkrete erste Schritte zur Eindämmung und Analyse eines Vorfalls enthält.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R4',
    category: 'Respond' as NistCategory, // Incident Response Testing & Updates
    text: 'Wird der Notfallplan regelmässig aktualisiert und getestet?',
    description: 'Suchen Sie nach Nachweisen für regelmässige Tests (z.B. Tabletop-Übungen) und Aktualisierungen des Notfallplans.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R5',
    category: 'Protect' as NistCategory, // Malware Protection - Endpoints
    text: 'Haben alle Clients einen aktuellen Virenschutz installiert?',
    description: 'Überprüfen Sie den Status der Antiviren-Software (installiert, aktuell, aktiv) auf allen Client-Geräten.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R6',
    category: 'Protect' as NistCategory, // Malware Protection - Servers
    text: 'Haben Server einen aktuellen Virenschutz installiert?',
    description: 'Überprüfen Sie den Status der Antiviren-Software oder anderer Endpoint-Security-Lösungen auf allen Servern.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R7',
    category: 'Detect' as NistCategory, // Vulnerability Management
    text: 'Wird ein regelmässiges Verfahren zum Erkennen von Schwachstellen im System genutzt?',
    description: 'Prüfen Sie, ob regelmässige Schwachstellenscans oder ähnliche Verfahren zur Identifizierung von Sicherheitslücken durchgeführt werden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R8',
    category: 'Protect' as NistCategory, // Physical Security
    text: 'Hat Ihr Unternehmen physische Schutzmassnahmen, wie Zutritt Regelung zu IT-Infrastruktur?',
    description: 'Bewerten Sie die physischen Sicherheitsvorkehrungen für Serverräume und andere kritische Bereiche (Zutrittskontrolle, Überwachung etc.).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R9',
    category: 'Recover' as NistCategory, // Data Backup
    text: 'Erfolgen regelmässige Backups auf alle wichtigen Systeme?',
    description: 'Überprüfen Sie den Backup-Plan und die Konfiguration, um sicherzustellen, dass alle kritischen Daten gesichert werden.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R10',
    category: 'Recover' as NistCategory, // Backup Testing
    text: 'Überprüfen Sie von Zeit zu Zeit die Funktionsfähigkeit Ihrer Backups?',
    description: 'Suchen Sie nach Nachweisen für regelmässige Wiederherstellungstests (Restore Tests) und deren Dokumentation.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R11',
    category: 'Recover' as NistCategory, // Offsite Backups
    text: 'Wird die Datensicherung extern aufbewahrt?',
    description: 'Stellen Sie sicher, dass Backup-Kopien physisch getrennt vom ursprünglichen Standort aufbewahrt werden (z.B. anderer Brandabschnitt, Cloud, externer Dienstleister).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R12',
    category: 'Recover' as NistCategory, // Backup Retention Compliance
    text: 'Werden die gesetzlichen Aufbewahrungspflichten eingehalten?',
    description: 'Prüfen Sie, ob die Aufbewahrungsdauer der Backups den gesetzlichen und regulatorischen Anforderungen entspricht.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R13',
    category: 'Protect' as NistCategory, // Patch Management - Identification
    text: 'Werden Systeme regelmässig auf ein Update überprüft?',
    description: 'Bewerten Sie den Prozess zur Identifizierung verfügbarer Sicherheitsupdates und Patches für Systeme und Software.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.R14',
    category: 'Protect' as NistCategory, // Patch Management - Deployment
    text: 'Werden Updates auf alle Geräte zeitnahe installiert? (Peripheriegeräte, Server, Drucker, Clients etc.)',
    description: 'Prüfen Sie, ob ein etablierter Prozess zur zeitnahen Installation von Sicherheitspatches auf allen relevanten Geräten existiert.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S1',
    category: 'Detect' as NistCategory, // Logging and Monitoring
    text: 'Werden Logdateien durch Ihre Systeme, Firewall und Datensicherung generiert und Fehler werden gemeldet?',
    description: 'Überprüfen Sie, ob relevante Systeme (Server, Firewall, etc.) Logdaten generieren und ob Mechanismen zur Alarmierung bei kritischen Fehlern existieren.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S2',
    category: 'Detect' as NistCategory, // Log Analysis Capability
    text: 'Reicht der Umfang und die Qualität der Logdateien, um den Uhrsprung eines Ereignis zu entdecken?',
    description: 'Bewerten Sie, ob die gesammelten Logdaten ausreichend detailliert sind, um Sicherheitsvorfälle nachzuvollziehen (Audit Trail).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S3',
    category: 'Detect' as NistCategory, // Data Processing Traceability (Privacy Aspect)
    text: 'Kann die Nachvollziehbarkeit der Verarbeitung von personenbezogenen Daten jederzeit gewährleistet werden?',
    description: 'Prüfen Sie, ob durch Protokollierung nachvollziehbar ist, wer wann auf welche personenbezogenen Daten zugegriffen oder diese verarbeitet hat.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S4',
    category: 'Protect' as NistCategory, // Secure Data Disposal
    text: 'Beachtet Ihr Unternehmen beim Entsorgen von IT-Infrastruktur, dass die Daten unwiderruflich gelöscht werden?',
    description: 'Überprüfen Sie den Prozess zur sicheren Datenlöschung oder physischen Zerstörung von Datenträgern vor der Entsorgung von Geräten.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S5',
    category: 'Protect' as NistCategory, // Mobile Device Management (BYOD)
    text: 'Werden die BYOD mit einer Mobile-Devicemanagement Software verwaltet?',
    description: 'Prüfen Sie, ob für private Geräte (Bring Your Own Device), die auf Unternehmensdaten zugreifen, eine MDM-Lösung zur Durchsetzung von Sicherheitsrichtlinien im Einsatz ist.',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  },
  {
    id: 'TEC.S6',
    category: 'Protect' as NistCategory, // Email Security Filtering
    text: 'Werden schädliche Mails und Spams herausgefiltert?',
    description: 'Bewerten Sie die Wirksamkeit der eingesetzten E-Mail-Sicherheitslösung (Spamfilter, Malware-Scanner).',
    score: undefined,
    maxScore: 10,
    comments: [],
    attachments: []
  }
];