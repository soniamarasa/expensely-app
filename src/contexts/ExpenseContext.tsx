import React, { createContext, useContext } from 'react';
import { IExpense } from '../interfaces/IExpense';

interface ExpenseContextType {
  expenses: IExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>;
}

export const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType
);

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseStorage = ({ children }: { children: any }) => {
  const [expenses, setExpenses] = React.useState([] as IExpense[]);

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};
