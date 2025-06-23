import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { SplitButton } from 'primereact/splitbutton';
import { Button } from 'primereact/button';

import { getExpenses } from '../../services/expenses-api';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import { IExpense } from '../../interfaces/IExpense';

import { ExpenseDialog } from '../../components/Dialogs/ExpenseDialog';

import './Expenses.scss';
import Loading from '../../components/Loading/Loading';

export const Expenses = () => {
  const { expenses, setExpenses } = React.useContext(ExpenseContext);
  const [currentExpense, setCurrentExpense] = useState({} as IExpense);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState(1);

  const types = [
    {
      label: 'Despesa',
      className: 'expense-menu',
      icon: 'pi pi-angle-double-down',
      command: () => {
        setType(1);
        loadExpenses(1);
      },
    },
    {
      label: 'Receita',
      className: 'revenue-menu',
      icon: 'pi pi-angle-double-up',
      command: () => {
        setType(2);
        loadExpenses(2);
      },
    },
  ];

  const iconExpense = (rowData: any) => {
    const icon = rowData.icon;
    return <i className={icon}></i>;
  };

  const colorExpense = (rowData: any) => {
    const color = rowData.color;
    return (
      <div
        className="color-category"
        style={{ backgroundColor: '#' + color }}
      ></div>
    );
  };

  const actionsExpense = (category: IExpense) => {
    return (
      <div className="actions-category">
        <Button
          icon="fa-solid fa-file-lines"
          rounded
          text
          aria-label="Relatórios"
          tooltip="Relatórios"
        />
        <Button
          icon="fa-solid fa-pen"
          rounded
          text
          aria-label="Editar"
          tooltip="Editar"
          onClick={() => {
            setCurrentExpense(category);
            setDialogVisible(true);
          }}
        />
      </div>
    );
  };

  const loadExpenses = React.useCallback(
    (type?: number) => {
      setLoading(true);
      getExpenses(type).then(({ data }) => {
        setExpenses(data);
        setLoading(false);
      });
    },
    [setExpenses]
  );

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  return (
    <div className="container-pages category-container">
      <div className="actions">
        <SplitButton
          appendTo={'self'}
          rounded
          className={type === 2 ? 'btn-revenue' : 'btn-expense'}
          label={
            type === 1 ? 'Categorias de Despesas' : 'Categorias de Receitas'
          }
          dropdownIcon="pi pi-angle-down"
          model={types}
        ></SplitButton>

        <Button
          icon="pi pi-plus"
          rounded
          aria-label="Nova Categoria"
          tooltip="Nova Categoria"
          onClick={() => {
            setCurrentExpense({} as IExpense);
            setDialogVisible(true);
          }}
        />
      </div>{' '}
      {!loading && expenses && expenses.length > 0 && (
        <DataTable
          emptyMessage="Nenhuma categoria encontrada."
          paginator
          paginatorDropdownAppendTo="self"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 40]}
          value={expenses}
        >
          <Column sortable field="name" header="Nome"></Column>
          <Column
            filterField="icon"
            body={iconExpense}
            header="Icone"
          ></Column>
          <Column
            filterField="color"
            body={colorExpense}
            header="Cor"
          ></Column>
          <Column
            header="Ações"
            filterField="category"
            body={actionsExpense}
          ></Column>
        </DataTable>
      )}
      {loading && <Loading />}
      <ExpenseDialog
        visible={dialogVisible}
        type={type}
        onHide={setDialogVisible}
        category={currentExpense}
      />
    </div>
  );
};
