export const workSpacesTypes = [
  { name: 'Residencial | Familiar', id: '1', icon: 'fa-solid fa-building-columns'},
  { name: 'Viagem', id: '2', icon: 'fa-solid fa-sack-dollar'},
  { name: 'Trabalho | Negócios', id: '3', icon: 'fa-solid fa-money-bill'},
  { name: 'Estudos', id: '4', icon: 'fa-solid fa-arrow-trend-up'},
  { name: 'Orçamento Pessoal', id: '5', icon: 'fa-solid fa-ellipsis'},
  { name: 'Evento', id: '6', icon: 'fa-solid fa-ellipsis'},
];


export const homeCategories = [
  { name: 'Aluguel', id: '1', icon: 'fa-solid fa-building-columns', workSpaceId: '1'},
  { name: 'Financiamento', id: '2', icon: 'fa-solid fa-sack-dollar', workSpaceId: '1'},
  { name: 'Condomínio', id: '3', icon: 'fa-solid fa-money-bill', workSpaceId: '1'},
  { name: 'Mercado', id: '4', icon: 'fa-solid fa-arrow-trend-up', workSpaceId: '1'},
  { name: 'Luz', id: '5', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Água', id: '6', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Gás', id: '7', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Internet', id: '8', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Manutenção', id: '9', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Faxina', id: '10', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Sáude', id: '11', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'Outros', id: '12', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'IPTU', id: '12', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'IPVA', id: '12', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
  { name: 'TAXA BOMBEIRO', id: '12', icon: 'fa-solid fa-ellipsis', workSpaceId: '1'},
]

export const travelCategories = [
  { name: 'Passagens', id: '1', icon: 'fa-solid fa-plane-departure', workSpaceId: '2'},
  { name: 'Hotel / Acomodação', id: '2', icon: 'fa-solid fa-bed', workSpaceId: '2'},
  { name: 'Alimentação', id: '3', icon: 'fa-solid fa-utensils', workSpaceId: '2'},
  { name: 'Transporte', id: '4', icon: 'fa-solid fa-bus', workSpaceId: '2'},
  { name: 'Passeios / Ingressos', id: '5', icon: 'fa-solid fa-ticket-alt', workSpaceId: '2'},
  { name: 'Seguro viagem', id: '6', icon: 'fa-solid fa-shield-alt', workSpaceId: '2'},
  { name: 'Lembrancinhas', id: '7', icon: 'fa-solid fa-gift', workSpaceId: '2'},
  { name: 'Emergências', id: '8', icon: 'fa-solid fa-triangle-exclamation', workSpaceId: '2'},
  { name: 'Outros', id: '9', icon: 'fa-solid fa-ellipsis', workSpaceId: '2'},
];

export const workCategories = [
  { name: 'Ferramentas / Softwares', id: '1', icon: 'fa-solid fa-screwdriver-wrench', workSpaceId: '3'},
  { name: 'Marketing / Anúncios', id: '2', icon: 'fa-solid fa-bullhorn', workSpaceId: '3'},
  { name: 'Transporte', id: '3', icon: 'fa-solid fa-car', workSpaceId: '3'},
  { name: 'Alimentação', id: '4', icon: 'fa-solid fa-utensils', workSpaceId: '3'},
  { name: 'Equipamentos', id: '5', icon: 'fa-solid fa-laptop', workSpaceId: '3'},
  { name: 'Assinaturas', id: '6', icon: 'fa-solid fa-receipt', workSpaceId: '3'},
  { name: 'Impostos / Taxas', id: '7', icon: 'fa-solid fa-receipt', workSpaceId: '3'},
  { name: 'Internet / Energia', id: '8', icon: 'fa-solid fa-bolt', workSpaceId: '3'},
  { name: 'Outros', id: '9', icon: 'fa-solid fa-ellipsis', workSpaceId: '3'},
];

export const studyCategories = [
  { name: 'Cursos', id: '1', icon: 'fa-solid fa-chalkboard-teacher', workSpaceId: '4'},
  { name: 'Livros', id: '2', icon: 'fa-solid fa-book', workSpaceId: '4'},
  { name: 'Plataformas (Alura, Udemy...)', id: '3', icon: 'fa-solid fa-laptop-code', workSpaceId: '4'},
  { name: 'Material escolar', id: '4', icon: 'fa-solid fa-pencil-ruler', workSpaceId: '4'},
  { name: 'Transporte', id: '5', icon: 'fa-solid fa-bus', workSpaceId: '4'},
  { name: 'Lanches', id: '6', icon: 'fa-solid fa-cookie-bite', workSpaceId: '4'},
  { name: 'Mensalidade / Matrícula', id: '7', icon: 'fa-solid fa-credit-card', workSpaceId: '4'},
  { name: 'Outros', id: '8', icon: 'fa-solid fa-ellipsis', workSpaceId: '4'},
];

export const personalBudgetCategories = [
  { name: 'Mercado', id: '1', icon: 'fa-solid fa-cart-shopping', workSpaceId: '5'},
  { name: 'Transporte', id: '2', icon: 'fa-solid fa-car', workSpaceId: '5'},
  { name: 'Lazer', id: '3', icon: 'fa-solid fa-masks-theater', workSpaceId: '5'},
  { name: 'Saúde', id: '4', icon: 'fa-solid fa-heart-pulse', workSpaceId: '5'},
  { name: 'Assinaturas', id: '5', icon: 'fa-solid fa-receipt', workSpaceId: '5'},
  { name: 'Delivery', id: '6', icon: 'fa-solid fa-motorcycle', workSpaceId: '5'},
  { name: 'Cartão de crédito', id: '7', icon: 'fa-solid fa-credit-card', workSpaceId: '5'},
  { name: 'Presentes', id: '8', icon: 'fa-solid fa-gift', workSpaceId: '5'},
  { name: 'Outros', id: '9', icon: 'fa-solid fa-gift', workSpaceId: '5'},
];

export const eventCategories = [
  { name: 'Local', id: '1', icon: 'fa-solid fa-map-location-dot', workSpaceId: '6'},
  { name: 'Buffet', id: '2', icon: 'fa-solid fa-utensils', workSpaceId: '6'},
  { name: 'Bebidas', id: '3', icon: 'fa-solid fa-wine-glass', workSpaceId: '6'},
  { name: 'Decoração', id: '4', icon: 'fa-solid fa-splotch', workSpaceId: '6'},
  { name: 'Música / DJ', id: '5', icon: 'fa-solid fa-music', workSpaceId: '6'},
  { name: 'Lembrancinhas', id: '6', icon: 'fa-solid fa-gift', workSpaceId: '6'},
  { name: 'Roupa', id: '7', icon: 'fa-solid fa-shirt', workSpaceId: '6'},
  { name: 'Fotografia', id: '8', icon: 'fa-solid fa-camera-retro', workSpaceId: '6'},
  { name: 'Transporte', id: '9', icon: 'fa-solid fa-car', workSpaceId: '6'},
  { name: 'Outros', id: '10', icon: 'fa-solid fa-gift', workSpaceId: '6'},
];
