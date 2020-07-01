export interface IbanValidationResult {
  /**
   * True when iban is considered as technically valid.
   */
  valid: boolean;
  /**
   * Messages returned by the openiban.com validation webservice.
   */
  messages: string[];
  /**
   * The original iban that this validation result refers to.
   */
  iban: string;
  /**
   * Contains details about the iban's issuing bank (if available).
   */
  bankData?: IbanBankData;
  checkResults?: IbanCheckResults;
}

export interface IbanBankData {
  bankCode: string;
  bic: string;
  city: string;
  name: string;
  zip: string;
}

export interface ValidatedIban {
  iban: string;
  valid: boolean;
  validBank: boolean;
  bankData?: IbanBankData;
}

export interface IbanCheckResults {
  /**
   * If a validateBankCode was set to true, this is the check result.
   */
  bankCode: boolean;
}
