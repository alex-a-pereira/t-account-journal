export enum EntryType {
  credit,
  debit
}

export interface EntryLineItem {
  entryNumber: number
  type: EntryType
  amount: number
}

/**
 * Every journal entry requires 2 parts - a debit and a credit.
 * entryNumber is unique to the JournalEntry object, but each line item NEEDS
 * to have the same entryNumber!!!
 */
export interface JournalEntry {
  entryNumber: number
  debits: EntryLineItem[]
  credits: EntryLineItem[]
}
