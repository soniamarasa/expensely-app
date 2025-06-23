import React, { ReactElement, useRef, useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
// import { ExpenseDialog } from '../../Dialogs/ExpenseDialog';
// import { TransferDialog } from '../../Dialogs/TransferDialog';
// import { IncomeDialog } from '../../Dialogs/IncomeDialog';
// import { ExpenseCardDialog } from '../../Dialogs/ExpenseCardDialog';

export function Menu() {
  const menu = useRef<TieredMenu>(null);

  const [transactionDialogVisible, setTransactionDialogVisible] =
    useState(false);
  const [incomeDialogVisible, setIncomeDialogVisible] = useState(false);
  const [expenseDialogVisible, setExpenseDialogVisible] = useState(false);
  const [expenseCardDialogVisible, setExpenseCardDialogVisible] =
    useState(false);

  const items: any[] = [
    {
      label: 'Workspaces',

      icon: 'fa-solid fa-briefcase',
      command: () => {
        setIncomeDialogVisible(true);
      },
    },
    {
      label: 'Dashboard',

      icon: 'fa-solid fa-chart-line',
      command: () => {
        setExpenseDialogVisible(true);
      },
    },
    {
      label: 'Ações WorkSpace Atual',
      icon: 'pi pi-palette',
      items: [
        {
          label: 'Categorias',
          icon: 'fa-solid fa-table-list',
          badge: 2,
        },
        {
          label: 'Tags',
          icon: 'fa fa-tags',
          badge: 3,
        },
        {
          label: 'Depesas por mes',
          icon: 'fa-solid fa-money-bills',
          badge: 3,
        },
      ],
    },
  ];

  return (
    <>
      <div className="card flex justify-content-center">
        <Menubar model={items} />
      </div>

      {/* <ExpenseDialog
        visible={expenseDialogVisible}
        onHide={setExpenseDialogVisible}
      />

      <ExpenseCardDialog
        visible={expenseCardDialogVisible}
        onHide={setExpenseCardDialogVisible}
      />
      <IncomeDialog
        visible={incomeDialogVisible}
        onHide={setIncomeDialogVisible}
      />
      <TransferDialog
        visible={transactionDialogVisible}
        onHide={setTransactionDialogVisible}
      /> */}
    </>
  );
}
