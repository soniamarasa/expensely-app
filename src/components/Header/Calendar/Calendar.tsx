import React, { useState } from 'react';
import { Calendar, CalendarViewChangeEvent } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

export const CalendarInput = () => {
  const today = new Date();
  const [date, setDate] = useState<string | Date | Date[] | null>(today);
  addLocale('pt', {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    today: 'Hoje',
    clear: 'Limpar',
    weekHeader: 'Semana',
  });
  return (
    <Calendar
      view="month"
      dateFormat="mm/yy"
      // value={date}
      onChange={(e: CalendarViewChangeEvent | any) => setDate(e.value)}
      showIcon
      locale="pt"
    />
  );
};
