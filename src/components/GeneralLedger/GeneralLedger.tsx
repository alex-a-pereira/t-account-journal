import React from 'react'
import { Table, Input, Icon } from 'semantic-ui-react'

import {
  JournalEntry, EntryLineItem, EntryType
} from '@typings'

import { useJournalDataContext } from '@providers/JournalDataProvider'

import './GeneralLedger.scss'

interface EntryLineItemRowProps {
  entryLineItem: EntryLineItem
}

const EntryLineItemRow: React.FC<EntryLineItemRowProps> = (props: EntryLineItemRowProps) => {
  const { entryLineItem } = props
  const { updateEntryLineItem } = useJournalDataContext()

  const isDebit = entryLineItem.type === EntryType.debit

  return (
    <>
      <Table.Cell>
        {isDebit && (
          <Input
            fluid
            size='small'
            defaultValue={entryLineItem.accountName}
            onChange={event => {
              updateEntryLineItem(entryLineItem.id, { accountName: event.target.value })
            }}
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {!isDebit && (
          <Input
            fluid
            size='small'
            defaultValue={entryLineItem.accountName}
            onChange={event => {
              updateEntryLineItem(entryLineItem.id, { accountName: event.target.value })
            }}
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {isDebit && (
          <Input
            fluid
            size='small'
            defaultValue={entryLineItem.amount}
            onChange={event => {
              updateEntryLineItem(entryLineItem.id, { amount: event.target.value })
            }}
          />
        )}
      </Table.Cell>
      <Table.Cell>
        {!isDebit && (
          <Input
            fluid
            size='small'
            defaultValue={entryLineItem.amount}
            onChange={event => {
              updateEntryLineItem(entryLineItem.id, { amount: event.target.value })
            }}
          />
        )}
      </Table.Cell>
    </>
  )
}

interface JournalEntryRowProps {
  journalEntry: JournalEntry
}

export const JournalEntryRow: React.FC<JournalEntryRowProps> = (props: JournalEntryRowProps) => {
  const { journalEntry } = props
  const { deleteJournalEntry } = useJournalDataContext()

  const allLineItems = [...journalEntry.debits, ...journalEntry.credits]

  return (
    <>
      {
          allLineItems.map((lineItem, idx) => {
            return (
              <Table.Row key={idx}>
                {
                  idx === 0 && (
                    <Table.Cell rowSpan={allLineItems.length}>
                      {journalEntry.entryNumber}
                      <div
                        className='delete-icon-container'
                        onClick={() => {
                          deleteJournalEntry(journalEntry.entryNumber)
                        }}
                      >
                        <Icon
                          name='trash alternate'
                          color='red'
                        />
                      </div>
                    </Table.Cell>
                  )
                }
                <EntryLineItemRow entryLineItem={lineItem} />
              </Table.Row>
            )
          })
        }

    </>
  )
}

export const GeneralLedger: React.FC = () => {
  const { journalEntries, createNewJournalEntry } = useJournalDataContext()

  return (
    <div>
      <Table celled structured compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{null}</Table.HeaderCell>
            <Table.HeaderCell>Debit</Table.HeaderCell>
            <Table.HeaderCell>Credit</Table.HeaderCell>
            <Table.HeaderCell>Debit</Table.HeaderCell>
            <Table.HeaderCell>Credit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {journalEntries.map((journalEntry, idx) => {
            return <JournalEntryRow journalEntry={journalEntry} key={idx} />
          })
        }
        </Table.Body>
      </Table>
      <button
        onClick={() => {
          createNewJournalEntry()
        }}
      >
        Add Entry
      </button>
    </div>
  )
}
