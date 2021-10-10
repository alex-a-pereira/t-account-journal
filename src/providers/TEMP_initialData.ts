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

const makeDebit = (amount: number): Debit => {
  return {
    accountName: getAcctName(),
    type: EntryType.debit,
    amount: amount
  }
}

const makeCredit = (amount: number): Credit => {
  return {
    accountName: getAcctName(),
    type: EntryType.credit,
    amount: amount
  }
}

let count = 0

const makeJournalEntry = (): JournalEntry => {
  const numDebits = Math.random() * (3 - 1) + 1
  const numCredits = Math.random() * (4 - 1) + 1

  const entryTotal = Math.random() * (1000 - 100) + 100
  const entryNumber = count++

  const debits: Debit[] = []
  for (let i = 0; i < numDebits; i++) {
    debits.push(
      makeDebit(
        roundAmount(entryTotal / numDebits)
      )
    )
  }

  const credits: Credit[] = []
  for (let i = 0; i < numCredits; i++) {
    credits.push(
      makeCredit(
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
    makeJournalEntry()
  ].sort((a, b) => a.entryNumber - b.entryNumber)
}
