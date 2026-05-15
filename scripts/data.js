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
    notas: "Não aceita reserva — só walk-in. Omakase, 4.9⭐. Abre até 00h, opção pra sáb à noite depois do Florería.",
  },
  {
    id: "la-cabrera",
    nome: "La Cabrera",
    tipo: "parrilla",
    bairro: "Palermo",
    endereco: "José A. Cabrera 5099, Palermo",
    coords: [-34.5872, -58.4350],
    reserva: "walkin",
    indicacao: "Beatriz",
    notas: "Não conseguimos reserva pelo Meitre — fim de semana lota cedo. Se quiser tentar walk-in, ir muito cedo (19h) ou tarde.",
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
    notas: "Não conseguimos reserva — só walk-in. World's 50 Best Bars #46 (2024). Chegar 20:30 (abrem 20h) pra evitar fila. Falar: 'Hola, dos personas para tomar tragos'. Marca: Príncipe de Apóstoles.",
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

  // ============ COMPRAS (curadoria pra Bia) ============
  {
    id: "maria-cher",
    nome: "María Cher",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4724",
    coords: [-34.5876, -58.4287],
    reserva: "walkin",
    indicacao: "Curadoria",
    notas: "A mais 'grown-up' das marcas argentinas: alfaiataria limpa, cortes minimalistas, paleta neutra. Veste melhor que Rapsodia (boho) e Jazmín Chebar (festa). Sáb 10h-20h.",
  },
  {
    id: "humawaca",
    nome: "Humawaca",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4692",
    coords: [-34.5880, -58.4284],
    reserva: "walkin",
    indicacao: "Curadoria",
    notas: "Couro de autor: bolsas escultóricas em couro vegetal, design geométrico. Nada parecido com Prüne (mainstream). Melhor opção de couro 'design' da cidade. Sáb 10h-20h.",
  },
  {
    id: "mishka",
    nome: "Mishka",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4673",
    coords: [-34.5882, -58.4283],
    reserva: "walkin",
    indicacao: "Curadoria",
    notas: "Sapatos autorais argentinos: oxford, mocassim e salto baixo com design. Couro de verdade, mais interessante que Sarkany comercial. Sáb 10h-20h.",
  },
  {
    id: "rapsodia",
    nome: "Rapsodia",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Honduras 4872",
    coords: [-34.5862, -58.4308],
    reserva: "walkin",
    indicacao: "Curadoria",
    notas: "Vale se a Bia curte estampa/boho/sedas. Pular se o estilo é minimalista. Loja-conceito grande, vale entrar pelo ambiente. Sáb 10h-21h.",
  },
  {
    id: "celedonio",
    nome: "Celedonio (joias)",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Honduras 4901",
    coords: [-34.5859, -58.4310],
    reserva: "walkin",
    indicacao: "Curadoria",
    notas: "Joia escultural em prata e pedras argentinas (rodocrosita). Único — não tem paralelo no Brasil. Imperdível se ela curte peça-conceito. Sáb 11h-20h.",
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
      { hora: "21:45", lugarId: null, titulo: "Pouso em Ezeiza", desc: "Imigração + saída do aeroporto: 30-45 min. Sem bagagem despachada." },
      { hora: "22:30", lugarId: null, titulo: "Cabify pro hotel", desc: "~45-60 min até Palermo Soho. R$80-120. Conferir endereço Thames 2226." },
      { hora: "23:30", lugarId: null, titulo: "Check-in no Vain", desc: "Avisar o hotel com antecedência. Pegar chave, deixar mala, refrescar." },
      { hora: "00:00", lugarId: "gris-gris", titulo: "Drink no Gris Gris (opcional)", desc: "Bar cool/disco a 10 min do hotel, walk-in. Se cansado: hotel + Rappi." },
    ],
  },
  {
    dia: "Sábado 16/05",
    titulo: "Don Julio + Florería",
    icone: "sun",
    itens: [
      { hora: "10:00", lugarId: "oli", titulo: "Café no Oli ⭐", desc: "Must da Bia. 12 min a pé ou 4 min Uber. Walk-in. Pedir medialunas + flat white." },
      { hora: "11:15", lugarId: null, titulo: "Uber pra Recoleta", desc: "~15 min de Palermo Hollywood até Recoleta." },
      { hora: "11:30", lugarId: "recoleta-cemiterio", titulo: "Cemitério da Recoleta", desc: "1h aqui. Túmulo de Evita, mausoléus históricos. Entrada paga." },
      { hora: "12:30", lugarId: "el-ateneo", titulo: "El Ateneo Grand Splendid", desc: "5 min a pé do cemitério. 30 min — foto obrigatória e olhar de cima." },
      { hora: "13:00", lugarId: "casa-palanti", titulo: "Lanche LEVE em Recoleta", desc: "Casa Palanti ou só café — NÃO comer pesado. Don Julio é em 2h." },
      { hora: "13:45", lugarId: null, titulo: "Uber de volta pra Palermo", desc: "~15 min." },
      { hora: "14:15", lugarId: null, titulo: "Hotel: refresca e troca", desc: "45 min pra trocar, beber água e respirar." },
      { hora: "15:00", lugarId: "don-julio", titulo: "🥩 DON JULIO (RESERVADO)", desc: "Chegar 14:50. Ver sugestões de pedido no card do lugar.", destaque: true },
      { hora: "17:30", lugarId: null, titulo: "Refrescar no hotel", desc: "30 min pra trocar de roupa e respirar depois do almoço." },
      { hora: "18:00", lugarId: "maria-cher", titulo: "🛍️ Tour de compras Palermo Soho (Bia)", desc: "Caminhada ~2h por 5 lojas curadas, todas numa quadra:\n1. María Cher (El Salvador 4724) — moda autoral\n2. Humawaca (El Salvador 4692) — couro design\n3. Mishka (El Salvador 4673) — sapatos\n4. Rapsodia (Honduras 4872) — boho\n5. Celedonio (Honduras 4901) — joias de autor\n\nAlt p/ Lourenço: drink no Tres Monos (Guatemala 4699) ou Aldo's Vinoteca." },
      { hora: "20:00", lugarId: null, titulo: "Volta rápida ao hotel", desc: "Trocar pro Florería, conferir endereço (Arroyo 872, Retiro)." },
      { hora: "20:30", lugarId: "floreria", titulo: "🍸 Florería Atlántico (walk-in)", desc: "Chegar 20:30 pra evitar fila. ~2-2h30 no local.", destaque: true },
      { hora: "23:00", lugarId: null, titulo: "Pós-Florería — escolher", desc: "1) Norimoto (japa) 2) CoChinChina (bar) 3) Uptown (balada) 4) Hotel." },
    ],
  },
  {
    dia: "Domingo 17/05",
    titulo: "El Preferido + voo",
    icone: "plane-takeoff",
    itens: [
      { hora: "09:30", lugarId: null, titulo: "Acorda + arruma malas", desc: "Tudo pronto pra deixar no luggage storage." },
      { hora: "10:00", lugarId: "cuervo", titulo: "Café no Cuervo ⭐", desc: "7 min a pé do Vain, walk-in. Avocado toast, alfajor, flat white." },
      { hora: "11:00", lugarId: null, titulo: "Checkout + luggage storage", desc: "Deixar malas no Vain até a tarde." },
      { hora: "11:30", lugarId: null, titulo: "Uber pra San Telmo", desc: "~20 min até Plaza Dorrego." },
      { hora: "12:00", lugarId: "san-telmo", titulo: "Feira de San Telmo 🌟", desc: "Único dia. Caminhada pela rua Defensa, antiguidades, tango de rua. ~1h30." },
      { hora: "13:30", lugarId: null, titulo: "Uber de volta pra Palermo", desc: "~20 min." },
      { hora: "14:00", lugarId: null, titulo: "Hotel: descansa e troca", desc: "1h pra respirar antes do El Preferido. Já deixar tudo pronto pra pegar as malas correndo às 17:45." },
      { hora: "14:55", lugarId: null, titulo: "Caminhada até El Preferido", desc: "5 min a pé." },
      { hora: "15:00", lugarId: "el-preferido", titulo: "🥩 EL PREFERIDO (RESERVADO)", desc: "AVISAR o garçom LOGO que o voo é 21:55 — precisa sair 17:30 máx.", destaque: true },
      { hora: "17:30", lugarId: null, titulo: "Sai do El Preferido", desc: "Pula sobremesa se atrasar." },
      { hora: "17:45", lugarId: null, titulo: "Hotel: pega malas", desc: "Conferir documentos (passaporte!) antes de chamar o Cabify." },
      { hora: "18:15", lugarId: null, titulo: "Cabify pra Ezeiza (LIMITE)", desc: "45-60 min até o aeroporto. Não atrasar." },
      { hora: "19:30", lugarId: null, titulo: "Chega Ezeiza", desc: "Check-in voo, segurança." },
      { hora: "21:55", lugarId: null, titulo: "✈️ DECOLA", desc: "" },
    ],
  },
];

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
  parrilla: { label: "Parrilla", icone: "🥩", cor: "#b8482e" },
  bodegon: { label: "Bodegón", icone: "🍴", cor: "#c96b3a" },
  japa: { label: "Japonesa", icone: "🍣", cor: "#2a6b8a" },
  italiana: { label: "Italiana", icone: "🍝", cor: "#7a9d3a" },
  cafe: { label: "Café", icone: "☕", cor: "#8a5a32" },
  bar: { label: "Bar", icone: "🍸", cor: "#8a3a52" },
  balada: { label: "Balada", icone: "💃", cor: "#6d3088" },
  compras: { label: "Compras", icone: "🛍️", cor: "#3a7a7a" },
  passeio: { label: "Passeio", icone: "📍", cor: "#8a6a3a" },
};

export const RESERVA_META = {
  confirmada: { label: "Reservado ✅", cor: "#2d6a4f" },
  precisa: { label: "Precisa reservar", cor: "#b8841b" },
  walkin: { label: "Walk-in", cor: "#6c757d" },
};
