import React from 'react';
import {
  loanDetails,
  contractDetails,
  amortizationData,
  amortizationTotals,
  AmortizationRow,
  LoanDetail,
} from '../data/amortizationData';
import { formatCurrency } from '../utils/formatters';
import { Printer } from 'lucide-react';

// --- Helper Components ---

interface InfoTableProps {
  data: LoanDetail[];
}

const InfoTable: React.FC<InfoTableProps> = ({ data }) => (
  <div className="w-full md:w-1/2 p-1">
    <table className="w-full border-collapse text-sm">
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border border-gray-300">
            <td className="p-2 bg-gray-50 font-medium w-1/2 border-r border-gray-300">
              {item.label}
            </td>
            <td className={`p-2 w-1/2 ${item.isCurrency ? 'text-right' : 'text-left'}`}>
              {item.isCurrency ? formatCurrency(item.value as number) : item.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AmortizationSchedulePage: React.FC = () => {
  const tableHeaders = [
    'Nº',
    'Échéance',
    'Capital Restant',
    'Amortissement',
    'Intérêts',
    'Ass.Vie',
    'Ass.Inc',
    'Int.Add',
    'Mensualité',
    'Statut',
  ];

  const renderRow = (row: AmortizationRow, isTotal: boolean = false) => {
    const cells = [
      isTotal ? '' : row.n,
      isTotal ? 'TOTAL' : row.echeance,
      isTotal ? '' : row.capitalRestant,
      row.amortissement,
      row.interets,
      row.assVie,
      row.assInc,
      row.intAdd,
      row.mensualite,
      isTotal ? '' : row.statut,
    ];

    return (
      <tr
        key={isTotal ? 'total' : row.n}
        className={`border-b border-gray-300 ${isTotal ? 'font-bold bg-gray-100' : 'hover:bg-gray-50'}`}
      >
        {cells.map((cell, index) => {
          const isCurrencyField = index >= 2 && index <= 8;
          const isStatus = index === 9 && !isTotal;

          let content = cell;
          let alignment = 'text-left';

          if (isCurrencyField) {
            content = formatCurrency(cell as number);
            alignment = 'text-right';
          } else if (isStatus) {
            const statusClasses =
              cell === 'PAYÉE'
                ? 'text-green-600'
                : cell === 'EN COURS'
                ? 'text-yellow-600'
                : 'text-gray-500';
            content = <span className={statusClasses}>{cell}</span>;
            alignment = 'text-center';
          } else if (index === 0) {
            alignment = 'text-center';
          }

          return (
            <td key={index} className={`p-2 text-xs border-r border-gray-200 ${alignment}`}>
              {content}
            </td>
          );
        })}
      </tr>
    );
  };
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      
      {/* Print Button - Hidden when printing */}
      <div className="flex justify-end mb-4 max-w-5xl mx-auto print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
        >
          <Printer size={18} />
          <span>Imprimer le Tableau</span>
        </button>
      </div>

      {/* 1. Header Section */}
      <header className="mb-8 border-b pb-4">
        <div className="text-center mb-4">
          <h1 className="text-xl font-serif font-bold text-gray-800">BH بنك BANK</h1>
        </div>
        <h2 className="text-2xl font-extrabold text-center mb-4 uppercase tracking-wider">
          TABLEAU D’AMORTISSEMENT
        </h2>
        <div className="flex justify-between text-sm text-gray-600 max-w-3xl mx-auto">
          <span>Réf. Crédit: 987654321</span>
          <span>Date: 15/05/2024</span>
        </div>
      </header>

      {/* 2. Loan Information Tables */}
      <div className="flex flex-wrap -m-1 mb-8 max-w-5xl mx-auto">
        <InfoTable data={loanDetails} />
        <InfoTable data={contractDetails} />
      </div>

      {/* 3. Amortization Table */}
      <section className="overflow-x-auto shadow-lg border border-gray-300 max-w-full mx-auto">
        <table className="min-w-full divide-y divide-gray-300 border-collapse">
          <thead>
            <tr className="bg-gray-700 text-white text-xs uppercase tracking-wider">
              {tableHeaders.map((header, index) => (
                <th
                  key={header}
                  className={`p-2 font-semibold border-r border-gray-600 ${
                    index >= 2 && index <= 8 ? 'text-right' : 'text-left'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Data Rows */}
            {amortizationData.map((row) => renderRow(row))}

            {/* Totals Row */}
            {renderRow(
              {
                n: 0,
                echeance: '',
                capitalRestant: 0, // Not summed
                amortissement: amortizationTotals.amortissement,
                interets: amortizationTotals.interets,
                assVie: amortizationTotals.assVie,
                assInc: amortizationTotals.assInc,
                intAdd: amortizationTotals.intAdd,
                mensualite: amortizationTotals.mensualite,
                statut: 'PAYÉE', // Placeholder, unused in total row
              },
              true
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AmortizationSchedulePage;