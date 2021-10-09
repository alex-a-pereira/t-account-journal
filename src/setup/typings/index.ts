export enum EntryType {
  credit,
  debit
}

export interface EntryLineItem {
  entryNumber: number
  type: EntryType
  amount: number,
  accountName: string
}

export interface Debit extends EntryLineItem {
  type: EntryType.debit
}

export interface Credit extends EntryLineItem {
  type: EntryType.credit
}

/**
 * Every journal entry requires 2 parts - a debit and a credit.
 * entryNumber is unique to the JournalEntry object, but each line item NEEDS
 * to have the same entryNumber!!!
 */
export interface JournalEntry {
  entryNumber: number
  debits: Debit[]
  credits: Credit[]
}
