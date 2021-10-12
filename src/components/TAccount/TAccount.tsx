import React from 'react'

import { Table } from 'semantic-ui-react'

import {
  EntryType,
  EntryLineItem,
  EntryLineItemWithEntryNumber
} from '@typings'

import './TAccount.scss'

interface TAccountEntryRowProps {
  entryLineItem: EntryLineItem
}

const TAccountEntryRow: React.FC<TAccountEntryRowProps> = (props: TAccountEntryRowProps) => {
  const { entryLineItem } = props

  const isDebit = entryLineItem.type === EntryType.debit

  return (
    <Table.Row>
      <Table.Cell>{entryLineItem.entryNumber}</Table.Cell>
      <Table.Cell>{isDebit && entryLineItem.amount}</Table.Cell>
      <Table.Cell>{!isDebit && entryLineItem.amount}</Table.Cell>
    </Table.Row>
  )
}

interface TAccountProps {
  lineItems: EntryLineItemWithEntryNumber[],
  accountName: string
}

export const TAccount: React.FC<TAccountProps> = (props: TAccountProps) => {
  const {
    lineItems, accountName
  } = props

  const endingBalance = lineItems.reduce((acc, item) => {
    return acc + item.amount * (item.type === EntryType.debit ? 1 : -1)
  }, 0)

  const endingBalanceRounded = Math.round((endingBalance + Number.EPSILON) * 100) / 100
  const endingBalIsDebit = endingBalanceRounded >= 0

  return (
    <div className="t-account">
      <Table compact striped celled>
        {/* HEADER */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3' textAlign='center' className='acct-name-cell'>
              {accountName}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width={1}>#</Table.HeaderCell>
            <Table.HeaderCell>dr</Table.HeaderCell>
            <Table.HeaderCell>cr</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* BODY - one row per line item */}
        <Table.Body>
          {
            lineItems.map((li, idx) => {
              return (
                <TAccountEntryRow
                  key={idx}
                  entryLineItem={li}
                />
              )
            })
          }
        </Table.Body>
        {/* FOOTER for balance */}
        <Table.Footer>
          <Table.Row className='ending-bal-row'>
            <Table.Cell>bal</Table.Cell>
            <Table.Cell>
              {endingBalIsDebit ? endingBalanceRounded : null}
            </Table.Cell>
            <Table.Cell>
              {!endingBalIsDebit ? endingBalanceRounded * -1 : null}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}
