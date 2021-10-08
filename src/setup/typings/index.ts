export enum EntryType {
  credit,
  debit
}

export interface JournalEntry {
  entryNumber: number
  type: EntryType
  amount: number
}
