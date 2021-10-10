import React, { PropsWithChildren } from 'react'

import './Table.scss'

export interface TableConfig {

}

export interface TableData {

}

type TableProps = PropsWithChildren<{
  className?: string
}>

export const Table: React.FC<TableProps> = (props: TableProps) => {
  const {
    className = '',
    children
  } = props

  return (
    <table className={`table ${className}`}>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}

type RowProps = PropsWithChildren<{
  className?: string
  // is it an even or odd row?
  idx: number
}>

export const Row: React.FC<RowProps> = (props: RowProps) => {
  const {
    className = '',
    children
  } = props

  return (
    <tr className={`row ${className}`}>
      {children}
    </tr>
  )
}

type CellProps = PropsWithChildren<{
  className?: string
}>

export const Cell: React.FC<CellProps> = (props: CellProps) => {
  const {
    className = '',
    children
  } = props

  return (
    <td className={`cell ${className}`}>
      {children}
    </td>
  )
}
