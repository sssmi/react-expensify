import React from 'react'
import { shallow } from 'enzyme'
import expenses from '../fixtures/expenses'
import { EditExpensePage } from '../../components/EditExpensePage'

let startEditExpense
let startRemoveExpense
let history
let wrapper

beforeEach(() => {
  startEditExpense = jest.fn()
  startRemoveExpense = jest.fn()
  history = { push: jest.fn() } // history.push('/')
  wrapper = shallow(
    <EditExpensePage
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[0]}
    />,
  )
})

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should handle startEditExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0])
  expect(history.push).toHaveBeenCalledWith('/')
  expect(startEditExpense).toHaveBeenCalledWith(expenses[0].id, expenses[0])
})

test('should handle startRemoveExpense', () => {
  wrapper.find('button').simulate('click')
  expect(history.push).toHaveBeenCalledWith('/')
  expect(startRemoveExpense).toHaveBeenCalledWith({
    id: expenses[0].id,
  })
})
