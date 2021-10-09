import {
  EntryType, Debit, Credit, JournalEntry
} from '@typings'

const accountNames = [
  'cash',
  'accounts receivable',
  'assets',
  'revenue',
  'accounts receivable',
  'assets'
]

const getAcctName = () => {
  return accountNames[Math.floor(Math.random() * accountNames.length)]
}

const roundAmount = (amt: number) => {
  return Math.round((amt + Number.EPSILON) * 100) / 100
}

const makeDebit = (entryNumber: number, amount: number): Debit => {
  return {
    accountName: getAcctName(),
    entryNumber,
    type: EntryType.debit,
    amount: amount
  }
}

const makeCredit = (entryNumber: number, amount: number): Credit => {
  return {
    accountName: getAcctName(),
    entryNumber,
    type: EntryType.credit,
    amount: amount
  }
}

const makeJournalEntry = (): JournalEntry => {
  const numDebits = Math.random() * (3 - 1) + 1
  const numCredits = Math.random() * (4 - 1) + 1

  const entryTotal = Math.random() * (1000 - 100) + 100
  const entryNumber = Math.round(Math.random() * 100) * 2

  const debits: Debit[] = []
  for (let i = 0; i < numDebits; i++) {
    debits.push(
      makeDebit(
        entryNumber,
        roundAmount(entryTotal / numDebits)
      )
    )
  }

  const credits: Credit[] = []
  for (let i = 0; i < numCredits; i++) {
    credits.push(
      makeCredit(
        entryNumber,
        roundAmount(entryTotal / numCredits)
      )
    )
  }

  return { entryNumber, debits, credits }
}

interface DataStore {
  journalEntries: JournalEntry[]
}

export const dataStore: DataStore = {
  journalEntries: [
    makeJournalEntry(),
    makeJournalEntry(),
    makeJournalEntry(),
    makeJournalEntry(),
    makeJournalEntry(),
    makeJournalEntry()
  ].sort((a, b) => a.entryNumber - b.entryNumber)
}
