import {Component, OnInit} from '@angular/core';
import {fedTax2022, medicare2022, socialSecurity2022, stateTaxCA2022, TaxBracket} from "./tax-bracket";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tax-calc';

  incomeA: number = 107880; // Alex
  incomeB: number = 109512; // Amna

  incomeAPreTaxDeductions = (629.30) * 12;
  incomeBPreTaxDeductions = (1736.94) * 12;

  incomeAPostTaxDeductions = (0) * 12;
  incomeBPostTaxDeductions = (69.19) * 12;

  single: boolean = false;

  selectedFedTaxBrackets: TaxBracket[] = fedTax2022;
  selectedStateTaxBrackets: TaxBracket[] = stateTaxCA2022;

  tax?: Taxes;
  netIncomeWithPostTaxDeductions = 0;

  calculateTax() {
    const grossIncome: number = this.incomeA + this.incomeB;
    const grossIncomeMinusPreTaxDeductions: number = (this.incomeA - this.incomeAPreTaxDeductions) + (this.incomeB + this.incomeBPreTaxDeductions);

    console.log(`Incoming minus pre tax ded: ${grossIncomeMinusPreTaxDeductions}`);

    const fedTaxBracketIndex: number = AppComponent.findTaxBracket(this.selectedFedTaxBrackets, grossIncomeMinusPreTaxDeductions, false);
    const fedTax = AppComponent.calculateTax(this.selectedFedTaxBrackets, fedTaxBracketIndex, grossIncomeMinusPreTaxDeductions, false);

    const stateTaxBracketIndex: number = AppComponent.findTaxBracket(this.selectedStateTaxBrackets, grossIncomeMinusPreTaxDeductions, false);
    const stateTax = AppComponent.calculateTax(this.selectedStateTaxBrackets, stateTaxBracketIndex, grossIncomeMinusPreTaxDeductions, false);


    const socialSecurity = grossIncomeMinusPreTaxDeductions * socialSecurity2022;
    const medicare = grossIncomeMinusPreTaxDeductions * medicare2022;

    const netIncome = grossIncomeMinusPreTaxDeductions - fedTax - stateTax - socialSecurity - medicare;

    console.log(`Federal Tax: ${fedTax}`);
    console.log(`State Tax: ${stateTax}`);
    console.log(`Social security: ${socialSecurity}`);
    console.log(`Medicare: ${medicare}`);

    this.tax = {
      federalTax: fedTax,
      stateTax: stateTax,
      socialSecurityTax: socialSecurity,
      medicareTax: medicare
    };

    console.log(`NetIncome: ${netIncome}`);

    const netIncomeWithPostTaxDeductions = netIncome - this.incomeAPostTaxDeductions - this.incomeBPostTaxDeductions;

    console.log(`NetIncome With post tax deductions : ${netIncomeWithPostTaxDeductions}`);

    console.log(netIncomeWithPostTaxDeductions / 12);
    this.netIncomeWithPostTaxDeductions = netIncomeWithPostTaxDeductions;


  }

  static findTaxBracket(taxBrackets: TaxBracket[], income: number, single: boolean): number {
    for (let i = 0; i < taxBrackets.length; i++) {
      const taxBracket = taxBrackets[i];
      if ((single ? taxBracket.single.lessThanOrEqualTo : taxBracket.joint.lessThanOrEqualTo) === undefined) {
        if (single ? taxBracket.single.moreThan : taxBracket.joint.moreThan < income) return i;
      } else {
        if (single ? taxBracket.single.moreThan : taxBracket.joint.moreThan < income && single ? taxBracket.single.lessThanOrEqualTo! : taxBracket.joint.lessThanOrEqualTo! >= income) return i;
      }
    }
    throw new Error('Unexpected out of tax bracket');
  }

  static calculateTax(taxBrackets: TaxBracket[], taxBracketIndex: number, income: number, single: boolean) {
    let tax = 0;
    for (let i = 0; i < taxBracketIndex; i++) {
      const taxBracket: TaxBracket = taxBrackets[i];
      const taxInThisBracket = (taxBracket.joint.lessThanOrEqualTo! - taxBracket.joint.moreThan) * taxBracket.taxRate;
      console.log(`${taxBracket.joint.lessThanOrEqualTo! - taxBracket.joint.moreThan} @ ${taxBracket.taxRate * 100}% = ${taxInThisBracket}`);
      tax += taxInThisBracket;
      console.log(`Tax so far ${tax}`);
    }
    const taxInLastBracket = (income - taxBrackets[taxBracketIndex].joint.moreThan) * taxBrackets[taxBracketIndex].taxRate;
    console.log(`${income - taxBrackets[taxBracketIndex].joint.moreThan} @ ${taxBrackets[taxBracketIndex].taxRate * 100}% = ${taxInLastBracket}`);
    tax += taxInLastBracket;
    return tax;
  }

  ngOnInit(): void {



  }
}

export interface Taxes {
  federalTax: number;
  stateTax: number;
  socialSecurityTax: number;
  medicareTax: number;

}
