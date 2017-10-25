import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
})

// REMOVE_EXPENSE
const removeExpence = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id,
})
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates,
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
})

// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

const expensesReducerDefaultState = []

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined,
}

// Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        // Unlike .push(), spread operator or .concat() doesn't change the state
        ...state,
        action.expense,
      ]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense, // Grab all existing properties
            ...action.updates, // Override allproperties we passed down
          }
        }
        return expense
      })
    default:
      return state
  }
}

// Filters reducer
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      }
    default:
      return state
  }
}

// Store creation

const store = createStore(
  // key = root state name (expenses) and value is the reducer (expensesReducer)
  // thats supposed to manage that
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer,
  }),
)

store.subscribe(() => {
  console.log(store.getState())
})

const expenceOne = store.dispatch(addExpense({ description: 'Rent', amount: 666 }))
const expenceTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 2 }))

store.dispatch(removeExpence({ id: expenceOne.expense.id }))

store.dispatch(editExpense(expenceTwo.expense.id, { amount: 500 }))

store.dispatch(setTextFilter('rent'))
store.dispatch(setTextFilter(''))

const demoState = {
  expenses: [
    {
      id: 'sruotyw4er',
      description: 'October Rent',
      note: 'This was the final payment for that address.',
      amount: 66600,
      createdAt: 0,
    },
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  },
}