// =====================================================================
// DADOS DA VIAGEM BUENOS AIRES — Lourenço + Beatriz — 15 a 17/05/2026
// Toda a fonte de verdade do site vive aqui. App.js consome esses
// objetos e renderiza nas seções. Para editar uma indicação ou horário,
// edite só este arquivo.
// =====================================================================

export const VIAGEM = {
  destino: "Buenos Aires",
  dataIda: "2026-05-15T21:45:00-03:00",
  dataVolta: "2026-05-17T21:55:00-03:00",
  hotel: {
    nome: "Vain Boutique Hotel",
    endereco: "Thames 2226, Palermo Soho, Buenos Aires",
    coords: [-34.5836, -58.4250],
    checkin: "Sexta 15/05 ~23:30",
    checkout: "Domingo 17/05 ~11h (luggage storage até a noite)",
    telefone: "+54 11 4776-8246",
  },
  voos: {
    ida: {
      pouso: "Sex 15/05 21:45 em Ezeiza (EZE)",
      bagagem: "Sem despacho",
      ateHotel: "~1h45 — chegada estimada 23:30",
    },
    volta: {
      decola: "Dom 17/05 21:55 de Ezeiza (EZE)",
      saidaHotel: "18:15 no máximo (Cabify, 45-60 min)",
      checkInAero: "Estar no aeroporto até 19:30",
    },
  },
  pessoas: [
    { nome: "Lourenço Borges", contato: "+55 16 99276-0973" },
    { nome: "Beatriz", contato: "namorada" },
  ],
};

// ---------------------------------------------------------------------
// LUGARES — base única usada pelo mapa, pelas seções e pelos filtros.
// Campos:
//   id        slug único
//   nome      exibição
//   tipo      parrilla | bodegon | japa | italiana | judaica | cafe |
//             bar | balada | compras | passeio
//   bairro    Palermo Soho | Palermo Hollywood | Recoleta | Retiro |
//             San Telmo | outros
//   endereco  string
//   coords    [lat, lng] — usado no Leaflet
//   reserva   confirmada | precisa | walkin
//   indicacao "Pedro + Clara Sigrist" | "Beatriz" | "Próprio" | etc
//   destaque  bool — marca os "must"
//   notas     string curta
//   telefone  opcional (formato internacional p/ wa.me)
// ---------------------------------------------------------------------

export const LUGARES = [
  // ============ RESTAURANTES ============
  {
    id: "don-julio",
    nome: "Don Julio",
    tipo: "parrilla",
    bairro: "Palermo Soho",
    endereco: "Guatemala 4699, Palermo",
    coords: [-34.5859, -58.4292],
    reserva: "confirmada",
    indicacao: "Próprio",
    destaque: true,
    notas: "Sáb 15h. World's 50 Best. Tolerância 15min, chegar 14:50.",
    pedidoSugerido: [
      "Entrada: chinchulines, mollejas, picada de embutidos",
      "Pra dividir: bife de chorizo + ojo de bife",
      "Acompanhamento: batata frita + ensalada mixta",
      "Vinho: Catena Zapata Malbec ou Chacra Pinot Noir",
      "Sobremesa: panqueque de dulce de leche",
    ],
  },
  {
    id: "el-preferido",
    nome: "El Preferido de Palermo",
    tipo: "bodegon",
    bairro: "Palermo Soho",
    endereco: "Jorge Luis Borges 2108, Palermo",
    coords: [-34.5862, -58.4282],
    reserva: "confirmada",
    indicacao: "Pedro + Clara Sigrist",
    destaque: true,
    notas: "Dom 15h. Mesmo dono do Don Julio, chef Guido Tassi, Michelin. AVISAR o garçom que o voo é 21:55 — sair 17:30 max.",
    pedidoSugerido: [
      "Picada Preferido (embutidos artesanais) pra dividir",
      "Milanesa de bife de chorizo — assinatura da casa",
      "Tortilla española",
      "Sobremesa: arroz con leche ou panqueque dulce de leche",
      "Vinho da casa",
    ],
  },
  {
    id: "norimoto",
    nome: "Norimoto",
    tipo: "japa",
    bairro: "Palermo",
    endereco: "Amenábar 3, Palermo",
    coords: [-34.5780, -58.4400],
    reserva: "walkin",
    indicacao: "Beatriz",
    notas: "Omakase. 4.9⭐, walk-in obrigatório. Opção sáb à noite, abre até 00h.",
  },
  {
    id: "la-cabrera",
    nome: "La Cabrera",
    tipo: "parrilla",
    bairro: "Palermo",
    endereco: "José A. Cabrera 5099, Palermo",
    coords: [-34.5872, -58.4350],
    reserva: "precisa",
    indicacao: "Beatriz",
    notas: "Cheio no fds — reserva via meitre.com.",
  },
  {
    id: "mishiguene",
    nome: "Mishiguene",
    tipo: "judaica",
    bairro: "Palermo",
    endereco: "Lafinur 3368, Palermo",
    coords: [-34.5793, -58.4137],
    reserva: "precisa",
    indicacao: "Beatriz",
    notas: "Judaica autoral, reserva via Meitre.",
  },
  {
    id: "la-alacena",
    nome: "La Alacena",
    tipo: "italiana",
    bairro: "Palermo",
    endereco: "Gascón 1401, Palermo",
    coords: [-34.5950, -58.4180],
    reserva: "precisa",
    indicacao: "Beatriz",
    notas: "Italiana, reserva via Meitre.",
  },
  {
    id: "fervor",
    nome: "Fervor Brasas",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Posadas 1519, Recoleta",
    coords: [-34.5907, -58.3850],
    reserva: "precisa",
    indicacao: "Beatriz",
  },
  {
    id: "marti",
    nome: "Marti",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Recoleta",
    coords: [-34.5870, -58.3940],
    reserva: "precisa",
    indicacao: "Beatriz",
  },
  {
    id: "parrilla-maravilla",
    nome: "Parrilla Maravilla",
    tipo: "parrilla",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5840, -58.4310],
    reserva: "precisa",
    indicacao: "Beatriz",
  },
  {
    id: "elena",
    nome: "Elena (Four Seasons)",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Posadas 1086 (Four Seasons), Recoleta",
    coords: [-34.5925, -58.3804],
    reserva: "precisa",
    indicacao: "Beatriz",
    notas: "Parrilla refinada do Four Seasons.",
  },
  {
    id: "guita",
    nome: "Guita",
    tipo: "burger",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5860, -58.4275],
    reserva: "walkin",
    indicacao: "Beatriz",
    notas: "Cheeseburger informal.",
  },
  {
    id: "el-bocadito",
    nome: "El Bocadito",
    tipo: "bodegon",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5870, -58.4290],
    reserva: "walkin",
    indicacao: "Beatriz",
  },

  // ============ BARES ============
  {
    id: "floreria",
    nome: "Florería Atlántico",
    tipo: "bar",
    bairro: "Retiro",
    endereco: "Arroyo 872, Retiro",
    coords: [-34.5933, -58.3782],
    reserva: "walkin",
    indicacao: "Pedro + Clara Sigrist",
    destaque: true,
    notas: "World's 50 Best Bars #46 (2024). Sáb 20:30 walk-in. Falar: 'Hola, dos personas para tomar tragos'. Marca: Príncipe de Apóstoles.",
  },
  {
    id: "gris-gris",
    nome: "Gris Gris",
    tipo: "bar",
    bairro: "Palermo Hollywood",
    endereco: "Palermo Hollywood",
    coords: [-34.5786, -58.4356],
    reserva: "walkin",
    indicacao: "Pedro + Clara Sigrist + Beatriz",
    destaque: true,
    notas: "Bar cool/disco jovem. Sex de madrugada, walk-in.",
  },
  {
    id: "cochinchina",
    nome: "CoChinChina",
    tipo: "bar",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5845, -58.4368],
    reserva: "walkin",
    indicacao: "Beatriz",
    notas: "Bar autoral, World's 50 Best.",
  },
  {
    id: "tres-monos",
    nome: "Tres Monos",
    tipo: "bar",
    bairro: "Palermo",
    endereco: "Guatemala 4699, Palermo",
    coords: [-34.5858, -58.4288],
    reserva: "walkin",
    indicacao: "Próprio",
    notas: "Coquetelaria autoral.",
  },
  {
    id: "uptown",
    nome: "Uptown",
    tipo: "balada",
    bairro: "Palermo Hollywood",
    endereco: "Arévalo 2030, Palermo Hollywood",
    coords: [-34.5785, -58.4378],
    reserva: "walkin",
    indicacao: "Pedro + Clara Sigrist",
    notas: "Balada conceitual subway-style.",
  },

  // ============ CAFÉS ============
  {
    id: "oli",
    nome: "Oli",
    tipo: "cafe",
    bairro: "Palermo Hollywood",
    endereco: "Costa Rica 6020, Palermo Hollywood",
    coords: [-34.5793, -58.4391],
    reserva: "walkin",
    indicacao: "Beatriz",
    destaque: true,
    telefone: "+5411509971-46",
    notas: "MUST. Sáb 10h. Abre 9h, fecha terça. Medialunas famosas, brunch.",
  },
  {
    id: "cuervo",
    nome: "Cuervo Café",
    tipo: "cafe",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4580, Palermo Soho",
    coords: [-34.5904, -58.4259],
    reserva: "walkin",
    indicacao: "Beatriz",
    destaque: true,
    notas: "Dom 10h. Top 3 cafés de BA. Pedir: avocado toast, alfajor, flat white.",
  },
  {
    id: "tognis",
    nome: "Tognis Café",
    tipo: "cafe",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5840, -58.4270],
    reserva: "walkin",
    indicacao: "Beatriz",
  },
  {
    id: "casa-palanti",
    nome: "Casa Palanti",
    tipo: "cafe",
    bairro: "Recoleta",
    endereco: "Ortiz de Ocampo 2901, Recoleta",
    coords: [-34.5780, -58.4030],
    reserva: "walkin",
    indicacao: "Beatriz",
    notas: "Aperitivo rápido no sáb antes do Don Julio.",
  },

  // ============ PASSEIOS ============
  {
    id: "recoleta-cemiterio",
    nome: "Cemitério da Recoleta",
    tipo: "passeio",
    bairro: "Recoleta",
    endereco: "Junín 1760, Recoleta",
    coords: [-34.5876, -58.3935],
    reserva: "walkin",
    indicacao: "Próprio",
    notas: "Túmulo de Evita. Entrada paga, ~30min-1h.",
  },
  {
    id: "el-ateneo",
    nome: "El Ateneo Grand Splendid",
    tipo: "passeio",
    bairro: "Recoleta",
    endereco: "Av. Santa Fe 1860, Recoleta",
    coords: [-34.5953, -58.3935],
    reserva: "walkin",
    indicacao: "Próprio",
    notas: "Uma das livrarias mais bonitas do mundo. Foto obrigatória.",
  },
  {
    id: "malba",
    nome: "MALBA",
    tipo: "passeio",
    bairro: "Palermo",
    endereco: "Av. Pres. Figueroa Alcorta 3415",
    coords: [-34.5773, -58.4034],
    reserva: "walkin",
    indicacao: "Próprio",
    notas: "Museu de arte latino-americana. Opcional.",
  },
  {
    id: "san-telmo",
    nome: "Feira de San Telmo",
    tipo: "passeio",
    bairro: "San Telmo",
    endereco: "Plaza Dorrego, San Telmo",
    coords: [-34.6206, -58.3713],
    reserva: "walkin",
    indicacao: "Próprio",
    destaque: true,
    notas: "Só domingo. Antiguidades, tango de rua, rua Defensa.",
  },
];

// ---------------------------------------------------------------------
// ROTEIRO — sequência cronológica. Cada item pode referenciar um lugar
// pelo id (campo `lugarId`), e o app resolve nome/endereço/coords dali.
// ---------------------------------------------------------------------

export const ROTEIRO = [
  {
    dia: "Sexta 15/05",
    titulo: "Chegada",
    icone: "plane",
    itens: [
      { hora: "21:45", lugarId: null, titulo: "Pouso em Ezeiza", desc: "Sem bagagem despachada. Pegar Cabify/Uber pro hotel (~45-60 min, R$80-120)." },
      { hora: "23:30", lugarId: null, titulo: "Check-in no Vain", desc: "Avisar hotel com antecedência do horário de chegada." },
      { hora: "00:00", lugarId: "gris-gris", titulo: "Drink no Gris Gris (opcional)", desc: "Bar mais cool, vibe disco. 10 min do hotel, walk-in. Plano B: hotel + Rappi." },
    ],
  },
  {
    dia: "Sábado 16/05",
    titulo: "Don Julio + Florería",
    icone: "sun",
    itens: [
      { hora: "10:00", lugarId: "oli", titulo: "Café no Oli ⭐", desc: "Must da Beatriz. ~12 min a pé do hotel, walk-in." },
      { hora: "11:00", lugarId: null, titulo: "Uber pra Recoleta", desc: "~15 min." },
      { hora: "11:30", lugarId: "recoleta-cemiterio", titulo: "Cemitério da Recoleta", desc: "Túmulo de Evita, mausoléus históricos." },
      { hora: "12:30", lugarId: "el-ateneo", titulo: "El Ateneo Grand Splendid", desc: "Livraria ex-teatro. Foto obrigatória." },
      { hora: "13:30", lugarId: "casa-palanti", titulo: "Lanche LEVE em Recoleta", desc: "Casa Palanti ou só café — não comer pesado." },
      { hora: "14:00", lugarId: null, titulo: "Uber de volta pra Palermo", desc: "" },
      { hora: "14:30", lugarId: null, titulo: "Hotel, refresca e troca", desc: "" },
      { hora: "15:00", lugarId: "don-julio", titulo: "🥩 DON JULIO (RESERVADO)", desc: "Chegar 14:50. Ver sugestões de pedido no card do lugar.", destaque: true },
      { hora: "17:30", lugarId: null, titulo: "Descansar antes do Florería", desc: "Opções: cochilo no hotel, banho longo, passeio leve por Palermo Soho (Honduras/El Salvador), café no Cuervo ou drink no Tres Monos. Saída pro Florería 20:00-20:30." },
      { hora: "20:30", lugarId: "floreria", titulo: "🍸 Florería Atlántico (walk-in)", desc: "Chegar 20:30 pra evitar fila. ~2-2h30 no local.", destaque: true },
      { hora: "23:00", lugarId: null, titulo: "Pós-Florería — escolher", desc: "1) Norimoto (japa) 2) CoChinChina (bar) 3) Uptown (balada) 4) Hotel." },
    ],
  },
  {
    dia: "Domingo 17/05",
    titulo: "El Preferido + voo",
    icone: "plane-takeoff",
    itens: [
      { hora: "09:30", lugarId: null, titulo: "Acorda", desc: "" },
      { hora: "10:00", lugarId: "cuervo", titulo: "Café no Cuervo ⭐", desc: "7 min a pé do Vain, walk-in." },
      { hora: "11:00", lugarId: null, titulo: "Checkout + luggage storage", desc: "Deixar malas no Vain até a noite." },
      { hora: "11:30", lugarId: "san-telmo", titulo: "Feira de San Telmo 🌟", desc: "Único dia. Caminhada pela rua Defensa." },
      { hora: "13:30", lugarId: null, titulo: "Uber de volta pra Palermo", desc: "" },
      { hora: "14:30", lugarId: null, titulo: "Hotel, refresca", desc: "" },
      { hora: "15:00", lugarId: "el-preferido", titulo: "🥩 EL PREFERIDO (RESERVADO)", desc: "AVISAR garçom logo do voo 21:55. Sair 17:30 max.", destaque: true },
      { hora: "17:30", lugarId: null, titulo: "Sai do El Preferido", desc: "Pula sobremesa se necessário." },
      { hora: "17:45", lugarId: null, titulo: "Hotel, pega malas", desc: "" },
      { hora: "18:15", lugarId: null, titulo: "Cabify pra Ezeiza (MÁX)", desc: "45-60 min." },
      { hora: "19:30", lugarId: null, titulo: "Chega Ezeiza", desc: "" },
      { hora: "21:55", lugarId: null, titulo: "✈️ DECOLA", desc: "" },
    ],
  },
];

// ---------------------------------------------------------------------
// COMPRAS — lojas e regiões pra Beatriz
// ---------------------------------------------------------------------

export const COMPRAS = {
  modaFeminina: [
    { nome: "Rapsodia", desc: "Queridinha argentina, várias unidades em Palermo Soho" },
    { nome: "Jazmín Chebar", desc: "Moda feminina, Palermo" },
    { nome: "Maria Cher", desc: "Design contemporâneo argentino" },
    { nome: "Complot", desc: "Moda urbana" },
    { nome: "Bolivia", desc: "Boutique conceito Palermo" },
  ],
  couro: [
    { nome: "Arandú", desc: "Couro de qualidade, várias unidades" },
    { nome: "Casa Fagliano", desc: "Botas e couro de polo, ícone" },
    { nome: "Prüne", desc: "Bolsas e acessórios" },
  ],
  areas: [
    { nome: "Palermo Soho", desc: "Boutiques independentes, ruas Honduras / El Salvador / Gurruchaga / Thames (volta do hotel)" },
    { nome: "Avenida Santa Fé", desc: "Recoleta — shopping de rua tradicional" },
    { nome: "Recoleta Mall + Patio Bullrich", desc: "Shoppings tradicionais" },
    { nome: "Distrito Arcos", desc: "Outlet de marcas premium em Palermo" },
  ],
  feiras: [
    { nome: "Feira de San Telmo", desc: "Só domingo — antiguidades e artesanato" },
    { nome: "Mercat Villa Crespo", desc: "Mercado gastronômico" },
    { nome: "Mercado de Pulgas (Dorrego)", desc: "Vintage e antiguidades" },
  ],
  vinhos: [
    { nome: "Aldo's Vinoteca", desc: "Palermo" },
    { nome: "Lo de Joaquín Alberdi", desc: "Vinhos selecionados" },
  ],
};

// ---------------------------------------------------------------------
// LOGÍSTICA — dicas práticas
// ---------------------------------------------------------------------

export const LOGISTICA = [
  {
    grupo: "Transporte",
    itens: [
      "Cabify > Uber em BA (mais barato e disponível). Baixar ambos antes.",
      "Cabify pra Ezeiza: ~R$80-120 (45-60 min).",
      "Cabify dentro de Palermo: ~R$15-30 (5-15 min).",
    ],
  },
  {
    grupo: "Dinheiro",
    itens: [
      "Western Union tem o MELHOR câmbio dólar→peso.",
      "ATMs do aeroporto funcionam, mas câmbio ruim.",
      "Trazer dólares em espécie pra trocar.",
      "Cartões funcionam na maioria dos lugares.",
    ],
  },
  {
    grupo: "Documentos",
    itens: [
      "Passaporte obrigatório (CNH digital NÃO é aceita).",
      "RG físico com menos de 10 anos de emissão também serve.",
    ],
  },
  {
    grupo: "Idioma",
    itens: [
      "Espanhol básico ajuda muito.",
      "Restaurantes e hotéis: muitos falam inglês.",
      "Português é entendido em muitos lugares.",
    ],
  },
  {
    grupo: "Tomada e internet",
    itens: [
      "Padrão argentino: tipo I (3 pinos chatos) ou tipo C. Trazer adaptador.",
      "Hotel tem Wi-Fi. Para 4G: chip Claro/Movistar no aeroporto OU eSIM (Airalo) antes.",
    ],
  },
  {
    grupo: "Roupa (maio = outono/inverno em BA)",
    itens: [
      "Temperatura: 8-15°C.",
      "Casaco médio + suéter.",
      "Sapato fechado confortável (vai caminhar muito).",
      "Guarda-chuva (chove às vezes).",
    ],
  },
];

// ---------------------------------------------------------------------
// DISTÂNCIAS — a partir do Vain
// ---------------------------------------------------------------------

export const DISTANCIAS = [
  ["Don Julio", "7 min", "3 min"],
  ["El Preferido", "5 min", "2 min"],
  ["Oli (café)", "12 min", "4 min"],
  ["Cuervo (café)", "7 min", "3 min"],
  ["Norimoto", "15 min", "5 min"],
  ["Florería Atlántico", "—", "15 min"],
  ["Gris Gris", "10 min", "4 min"],
  ["Uptown", "15 min", "5 min"],
  ["Recoleta (Cemitério)", "—", "15 min"],
  ["El Ateneo", "—", "15 min"],
  ["San Telmo", "—", "20 min"],
  ["Ezeiza (EZE)", "—", "45-60 min"],
  ["Aeroparque (AEP)", "—", "15 min"],
];

// ---------------------------------------------------------------------
// MAPAS DE EXIBIÇÃO — usado pra ícones/cores por tipo de lugar
// ---------------------------------------------------------------------

export const TIPO_META = {
  parrilla: { label: "Parrilla", icone: "🥩", cor: "#a13b2a" },
  bodegon: { label: "Bodegón", icone: "🍴", cor: "#b8552d" },
  japa: { label: "Japonesa", icone: "🍣", cor: "#1f4f6f" },
  italiana: { label: "Italiana", icone: "🍝", cor: "#6c8a3a" },
  judaica: { label: "Judaica", icone: "🕎", cor: "#3a4d7a" },
  burger: { label: "Burger", icone: "🍔", cor: "#a07030" },
  cafe: { label: "Café", icone: "☕", cor: "#6b4226" },
  bar: { label: "Bar", icone: "🍸", cor: "#7a2a44" },
  balada: { label: "Balada", icone: "💃", cor: "#5d2275" },
  compras: { label: "Compras", icone: "🛍️", cor: "#3a6b6b" },
  passeio: { label: "Passeio", icone: "📍", cor: "#7a5a2a" },
};

export const RESERVA_META = {
  confirmada: { label: "Reservado ✅", cor: "#2d6a4f" },
  precisa: { label: "Precisa reservar", cor: "#b8841b" },
  walkin: { label: "Walk-in", cor: "#6c757d" },
};
