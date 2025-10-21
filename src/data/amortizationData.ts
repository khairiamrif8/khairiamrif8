import { formatCurrency } from '../utils/formatters';

export interface LoanDetail {
  label: string;
  value: string | number;
  isCurrency?: boolean;
}

export interface AmortizationRow {
  n: number;
  echeance: string;
  capitalRestant: number;
  amortissement: number;
  interets: number;
  assVie: number;
  assInc: number;
  intAdd: number;
  mensualite: number;
  statut: 'PAYÉE' | 'EN COURS' | 'À VENIR';
}

// --- Loan Details ---
export const loanDetails: LoanDetail[] = [
  { label: 'C.C.B', value: '1234567890' },
  { label: 'Titulaire', value: 'M. Dupont Jean' },
  { label: 'Produit', value: 'Prêt Immobilier' },
  { label: 'Montant autorisé', value: 200000, isCurrency: true },
  { label: 'Montant débloqué', value: 200000, isCurrency: true },
  { label: 'Taux annuel', value: '4.50 %' },
];

// --- Contract Details ---
export const contractDetails: LoanDetail[] = [
  { label: 'Décision', value: 'Accordé' },
  { label: 'Date effet', value: '01/01/2024' },
  { label: 'Date valeur', value: '01/01/2024' },
  { label: 'Mode recouvrement', value: 'Prélèvement Automatique' },
  { label: 'Durée', value: '240 mois' },
  { label: 'Périodicité', value: 'Mensuelle' },
];

// --- Amortization Table Data ---
const baseCapital = 200000;
const monthlyPayment = 1264.81; // Example calculated payment
const monthlyInterestRate = 0.045 / 12;
const monthlyAssVie = 20;
const monthlyAssInc = 10;

export const amortizationData: AmortizationRow[] = Array.from({ length: 5 }, (_, i) => {
  const n = i + 1;
  const capitalRestantStart = baseCapital - (i * 1000); // Simplified calculation for mock
  const interets = capitalRestantStart * monthlyInterestRate;
  const amortissement = monthlyPayment - interets - monthlyAssVie - monthlyAssInc;
  const capitalRestantEnd = capitalRestantStart - amortissement;

  return {
    n,
    echeance: `01/${String(n).padStart(2, '0')}/2024`,
    capitalRestant: capitalRestantEnd > 0 ? capitalRestantEnd : 0,
    amortissement: amortissement > 0 ? amortissement : 0,
    interets: interets,
    assVie: monthlyAssVie,
    assInc: monthlyAssInc,
    intAdd: 0,
    mensualite: monthlyPayment,
    statut: n <= 3 ? 'PAYÉE' : (n === 4 ? 'EN COURS' : 'À VENIR'),
  };
});

// --- Totals Calculation ---
export const calculateTotals = (data: AmortizationRow[]) => {
  return data.reduce(
    (acc, row) => {
      acc.amortissement += row.amortissement;
      acc.interets += row.interets;
      acc.assVie += row.assVie;
      acc.assInc += row.assInc;
      acc.intAdd += row.intAdd;
      acc.mensualite += row.mensualite;
      return acc;
    },
    {
      amortissement: 0,
      interets: 0,
      assVie: 0,
      assInc: 0,
      intAdd: 0,
      mensualite: 0,
    }
  );
};

export const amortizationTotals = calculateTotals(amortizationData);