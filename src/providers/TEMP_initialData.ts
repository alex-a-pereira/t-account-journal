import {
  EntryType, Debit, Credit, JournalEntry, JournalEntryNumber, EntryLineItem
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

const makeDebit = (entryNumber: JournalEntryNumber, amount: number): Debit => ({
  accountName: getAcctName(),
  entryNumber,
  type: EntryType.debit,
  amount,
  id: Date.now() * Math.random()
})

const makeCredit = (entryNumber: JournalEntryNumber, amount: number): Credit => ({
  accountName: getAcctName(),
  entryNumber,
  type: EntryType.credit,
  amount,
  id: Date.now() * Math.random()
})

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

const makeJeAndTransformToArr = (): EntryLineItem[] => {
  const je = makeJournalEntry()
  return [...je.debits, ...je.credits]
}

interface DataStore {
  journalEntries: JournalEntry[],
  // TODO: migrate everything to use this
  entryLineItems: EntryLineItem[]
}

export const dataStore: DataStore = {
  journalEntries: [
  ],
  entryLineItems: [
    ...makeJeAndTransformToArr(),
    ...makeJeAndTransformToArr(),
    ...makeJeAndTransformToArr(),
    ...makeJeAndTransformToArr()
  ]
}
