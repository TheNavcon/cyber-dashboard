import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Assessment, Category, Priority, Status } from '../types/assessment';
import { format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';

interface PDFReportProps {
  assessment: Assessment;
  language: 'de' | 'en';
}

const translations = {
  de: {
    title: 'Security Assessment',
    date: 'Erstellt am',
    executiveSummary: 'Management Zusammenfassung',
    overallSecurityScore: 'Gesamtbewertung',
    criticalMeasures: 'Kritische Massnahmen',
    completedMeasures: 'Abgeschlossene Massnahmen',
    measuresByPriority: 'Massnahmen nach Priorität',
    highPriority: 'Hohe Priorität',
    mediumPriority: 'Mittlere Priorität',
    lowPriority: 'Niedrige Priorität',
    criticalSecurityMeasures: 'Kritische Sicherheitsmassnahmen',
    measure: 'Massnahme',
    category: 'Kategorie',
    status: 'Status',
    categories: {
      Identify: 'Identifizieren',
      Protect: 'Schützen',
      Detect: 'Erkennen',
      Respond: 'Reagieren',
      Recover: 'Wiederherstellen',
    } as Record<Category, string>,
  },
  en: {
    title: 'Security Assessment',
    date: 'Created on',
    executiveSummary: 'Executive Summary',
    overallSecurityScore: 'Overall Security Score',
    criticalMeasures: 'Critical Measures',
    completedMeasures: 'Completed Measures',
    measuresByPriority: 'Measures by Priority',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    criticalSecurityMeasures: 'Critical Security Measures',
    measure: 'Measure',
    category: 'Category',
    status: 'Status',
    categories: {
      Identify: 'Identify',
      Protect: 'Protect',
      Detect: 'Detect',
      Respond: 'Respond',
      Recover: 'Recover',
    } as Record<Category, string>,
  },
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#374151',
  },
  coverPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e3a8a',
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#374151',
    textAlign: 'center',
  },
  coverDate: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 60,
    textAlign: 'center',
  },
  logo: {
    width: 180,
    marginBottom: 50,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1e3a8a',
    borderBottomWidth: 1,
    borderBottomColor: '#dbeafe',
    paddingBottom: 5,
  },
  scoreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 20,
  },
  scoreCard: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 15,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 5,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#4b5563',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  table: {
    width: '100%',
    marginVertical: 15,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 6,
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 9,
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 8,
    color: '#9ca3af',
  },
  categoryGrid: {
    marginVertical: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryLabel: {
    width: 100,
    fontSize: 10,
    color: '#4b5563',
  },
  categoryBar: {
    flex: 1,
    marginLeft: 10,
  },
  categoryScore: {
    width: 50,
    textAlign: 'right',
    fontSize: 10,
    fontWeight: 'bold',
  },
  measuresPriority: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  priorityItem: {
    alignItems: 'center',
  },
  priorityValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  priorityLabel: {
    fontSize: 9,
    color: '#4b5563',
  },
});

const getScoreColor = (score: number): string => {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#2563eb';
  if (score >= 40) return '#f59e0b';
  return '#dc2626';
};

const CategoryProgressBar = ({ category, score, t }: { category: Category; score: number; t: typeof translations['de'] }) => (
  <View style={styles.categoryRow}>
    <Text style={styles.categoryLabel}>{t.categories[category]}</Text>
    <View style={styles.categoryBar}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${score}%`, backgroundColor: getScoreColor(score) },
          ]}
        />
      </View>
    </View>
    <Text style={styles.categoryScore}>{score}%</Text>
  </View>
);

const PDFReport: React.FC<PDFReportProps> = ({ assessment, language = 'de' }) => {
  const t = translations[language];
  const criticalMeasures = assessment.measures.filter(m => m.priority === 'Hoch');
  const completedMeasures = assessment.measures.filter(m => m.status === 'Done');

  const priorityCounts = {
    high: assessment.measures.filter(m => m.priority === 'Hoch').length,
    medium: assessment.measures.filter(m => m.priority === 'Mittel').length,
    low: assessment.measures.filter(m => m.priority === 'Niedrig').length,
  };

  return (
    <Document title={`${t.title} - ${assessment.companyName}`}>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <Image
            src="https://www.herr-informatik.ch/wp-content/uploads/2022/03/Herr-Logo-1.jpg"
            style={styles.logo}
          />
          <Text style={styles.coverTitle}>{t.title}</Text>
          <Text style={styles.coverSubtitle}>{assessment.companyName}</Text>
          <Text style={styles.coverDate}>
            {t.date} {format(new Date(assessment.date), 'PPP', { locale: language === 'de' ? de : enUS })}
          </Text>
        </View>
        <Text style={styles.footer} fixed>
          © {new Date().getFullYear()} Herr Informatik GmbH
        </Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.executiveSummary}</Text>
          
          <View style={styles.scoreGrid}>
            <View style={styles.scoreCard}>
              <Text style={[styles.scoreValue, { color: getScoreColor(assessment.overallScore) }]}>
                {assessment.overallScore}%
              </Text>
              <Text style={styles.scoreLabel}>{t.overallSecurityScore}</Text>
            </View>
            <View style={styles.scoreCard}>
              <Text style={[styles.scoreValue, { color: '#dc2626' }]}>{criticalMeasures.length}</Text>
              <Text style={styles.scoreLabel}>{t.criticalMeasures}</Text>
            </View>
            <View style={styles.scoreCard}>
              <Text style={[styles.scoreValue, { color: '#16a34a' }]}>{completedMeasures.length}</Text>
              <Text style={styles.scoreLabel}>{t.completedMeasures}</Text>
            </View>
          </View>

          <View style={styles.categoryGrid}>
            {assessment.categoryScores.map((cat) => (
              <CategoryProgressBar 
                key={cat.category} 
                category={cat.category} 
                score={cat.score} 
                t={t}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.measuresByPriority}</Text>
          <View style={styles.measuresPriority}>
            <View style={styles.priorityItem}>
              <Text style={[styles.priorityValue, { color: '#dc2626' }]}>{priorityCounts.high}</Text>
              <Text style={styles.priorityLabel}>{t.highPriority}</Text>
            </View>
            <View style={styles.priorityItem}>
              <Text style={[styles.priorityValue, { color: '#f59e0b' }]}>{priorityCounts.medium}</Text>
              <Text style={styles.priorityLabel}>{t.mediumPriority}</Text>
            </View>
            <View style={styles.priorityItem}>
              <Text style={[styles.priorityValue, { color: '#16a34a' }]}>{priorityCounts.low}</Text>
              <Text style={styles.priorityLabel}>{t.lowPriority}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          © {new Date().getFullYear()} Herr Informatik GmbH
        </Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Critical Measures */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.criticalSecurityMeasures}</Text>
          
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>{t.measure}</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>{t.category}</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>{t.status}</Text>
            </View>
            {criticalMeasures.map((measure, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{measure.title}</Text>
                <Text style={styles.tableCell}>{t.categories[measure.category]}</Text>
                <Text style={styles.tableCell}>{measure.status}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.footer} fixed>
          © {new Date().getFullYear()} Herr Informatik GmbH
        </Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export default PDFReport;