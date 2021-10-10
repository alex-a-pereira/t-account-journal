export enum EntryType {
  credit,
  debit
}

export type JournalEntryNumber = number

export interface EntryLineItem {
  id: number // essentially like a PK
  type: EntryType
  amount: number,
  accountName: string
}

// NOTE: should only be used for adding supplementary data for UI purposes!
// i.e. the "source of truth" for entry number should ALWAYS come from JournalEntry
export interface EntryLineItemWithEntryNumber extends EntryLineItem {
  entryNumber: JournalEntryNumber
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
  entryNumber: JournalEntryNumber
  debits: Debit[]
  credits: Credit[]
}

// from @types/react InputHTMLAttributes
export type JournalInputValue = string | number | readonly string[] | undefined
