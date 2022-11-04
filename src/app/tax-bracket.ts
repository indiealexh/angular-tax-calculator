import {single} from "rxjs";
import {join} from "@angular/compiler-cli";

export interface TaxBracket {
  taxRate: number;
  single: TaxRateThresholds;
  joint: TaxRateThresholds;
}

export interface TaxRateThresholds {
  moreThan: number;
  lessThanOrEqualTo?: number;
}

export const socialSecurity2022: number = 0.062;
export const medicare2022: number = 0.009;

export const fedTax2022: TaxBracket[] = [
  {
    taxRate: 0.10,
    single: {
      moreThan: 0,
      lessThanOrEqualTo: 10275
    },
    joint: {
      moreThan: 0,
      lessThanOrEqualTo: 20550
    }
  },
  {
    taxRate: 0.12,
    single: {
      moreThan: 10275,
      lessThanOrEqualTo: 41775
    },
    joint: {
      moreThan: 20550,
      lessThanOrEqualTo: 83550
    }
  },
  {
    taxRate: 0.22,
    single: {
      moreThan: 41775,
      lessThanOrEqualTo: 89075
    },
    joint: {
      moreThan: 83550,
      lessThanOrEqualTo: 178150
    }
  },
  {
    taxRate: 0.24,
    single: {
      moreThan: 89075,
      lessThanOrEqualTo: 170050
    },
    joint: {
      moreThan: 178150,
      lessThanOrEqualTo: 340100
    }
  },
  {
    taxRate: 0.32,
    single: {
      moreThan: 170050,
      lessThanOrEqualTo: 215950
    },
    joint: {
      moreThan: 340100,
      lessThanOrEqualTo: 431900
    }
  },
  {
    taxRate: 0.35,
    single: {
      moreThan: 215950,
      lessThanOrEqualTo: 539000
    },
    joint: {
      moreThan: 431900,
      lessThanOrEqualTo: 647850
    }
  },
  {
    taxRate: 0.37,
    single: {
      moreThan: 539900
    },
    joint: {
      moreThan: 647850
    }
  }
];

export const stateTaxCA2022: TaxBracket[] = [
  {
    taxRate: 0.01,
    single: {
      moreThan: 0,
      lessThanOrEqualTo: 9325
    },
    joint: {
      moreThan: 0,
      lessThanOrEqualTo: 18650
    }
  },
  {
    taxRate: 0.02,
    single: {
      moreThan: 9325,
      lessThanOrEqualTo: 22107
    },
    joint: {
      moreThan: 18650,
      lessThanOrEqualTo: 44214
    }
  },
  {
    taxRate: 0.04,
    single: {
      moreThan: 22107,
      lessThanOrEqualTo: 34892
    },
    joint: {
      moreThan: 44214,
      lessThanOrEqualTo: 69784
    }
  },
  {
    taxRate: 0.06,
    single: {
      moreThan: 34892,
      lessThanOrEqualTo: 48435
    },
    joint: {
      moreThan: 69784,
      lessThanOrEqualTo: 96870
    }
  },
  {
    taxRate: 0.08,
    single: {
      moreThan: 48435,
      lessThanOrEqualTo: 61214
    },
    joint: {
      moreThan: 96870,
      lessThanOrEqualTo: 122428
    }
  },
  {
    taxRate: 0.093,
    single: {
      moreThan: 61214,
      lessThanOrEqualTo: 312686
    },
    joint: {
      moreThan: 122428,
      lessThanOrEqualTo: 625372
    }
  },
  {
    taxRate: 0.103,
    single: {
      moreThan: 312686,
      lessThanOrEqualTo: 375221
    },
    joint: {
      moreThan: 625372,
      lessThanOrEqualTo: 750442
    }
  },
  {
    taxRate: 0.113,
    single: {
      moreThan: 375221,
      lessThanOrEqualTo: 625369
    },
    joint: {
      moreThan: 750442,
      lessThanOrEqualTo: 1250738
    }

  },
  {
    taxRate: 0.123,
    single: {
      moreThan: 625369
    },
    joint: {
      moreThan: 1250738
    }
  }
];
