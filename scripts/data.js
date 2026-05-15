// =====================================================================
// DADOS DA VIAGEM BUENOS AIRES — Lourenço + Bia — 15 a 17/05/2026
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
    { nome: "Bia", contato: "namorada" },
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
    notas: "Dom 15h. Mesmo dono do Don Julio, chef Guido Tassi, Michelin. Sair 17:30 no máximo — voo às 21:55.",
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
    indicacao: "Bia",
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
    indicacao: "Bia",
    notas: "Não conseguimos reserva pelo Meitre — fim de semana lota cedo. Se quiser tentar walk-in, ir muito cedo (19h) ou tarde.",
  },
  {
    id: "la-alacena",
    nome: "La Alacena",
    tipo: "italiana",
    bairro: "Palermo",
    endereco: "Gascón 1401, Palermo",
    coords: [-34.5950, -58.4180],
    reserva: "walkin",
    indicacao: "Bia",
    notas: "Italiana, reserva via Meitre.",
  },
  {
    id: "fervor",
    nome: "Fervor Brasas",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Posadas 1519, Recoleta",
    coords: [-34.5907, -58.3850],
    reserva: "walkin",
    indicacao: "Bia",
  },
  {
    id: "marti",
    nome: "Marti",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Recoleta",
    coords: [-34.5870, -58.3940],
    reserva: "walkin",
    indicacao: "Bia",
  },
  {
    id: "parrilla-maravilla",
    nome: "Parrilla Maravilla",
    tipo: "parrilla",
    bairro: "Palermo",
    endereco: "Palermo",
    coords: [-34.5840, -58.4310],
    reserva: "walkin",
    indicacao: "Bia",
  },
  {
    id: "elena",
    nome: "Elena (Four Seasons)",
    tipo: "parrilla",
    bairro: "Recoleta",
    endereco: "Posadas 1086 (Four Seasons), Recoleta",
    coords: [-34.5925, -58.3804],
    reserva: "walkin",
    indicacao: "Bia",
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
    indicacao: "Bia",
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
    indicacao: "Pedro + Clara Sigrist + Bia",
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
    indicacao: "Bia",
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
    indicacao: "Bia",
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
    indicacao: "Bia",
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
    indicacao: "Bia",
  },
  {
    id: "casa-palanti",
    nome: "Casa Palanti",
    tipo: "cafe",
    bairro: "Recoleta",
    endereco: "Ortiz de Ocampo 2901, Recoleta",
    coords: [-34.5780, -58.4030],
    reserva: "walkin",
    indicacao: "Bia",
    notas: "Aperitivo rápido no sáb antes do Don Julio.",
  },

  // ============ LOJAS (dicas da Bia) ============
  // As 4 com destaque=true são as que ela faz questão de ir.

  {
    id: "vintage-hole",
    nome: "The Vintage Hole",
    tipo: "compras",
    bairro: "Villa Crespo",
    endereco: "Jufré 663, Villa Crespo",
    coords: [-34.5950, -58.4380],
    reserva: "walkin",
    indicacao: "Bia (faz questão)",
    destaque: true,
    fechaDom: true,
    notas: "Vintage de luxo curado: Chanel, Dior, YSL second-hand. Sáb 12h-20h.",
  },
  {
    id: "jazmin-chebar",
    nome: "Jazmin Chebar",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4702, Palermo Soho",
    coords: [-34.5876, -58.4296],
    reserva: "walkin",
    indicacao: "Bia (faz questão)",
    destaque: true,
    notas: "Moda feminina argentina, peças mais 'statement'. Sáb 10h30-20h30, dom 13h-19h.",
  },
  {
    id: "maria-antonieta",
    nome: "Maria Antonieta",
    tipo: "compras",
    bairro: "Villa Crespo",
    endereco: "Av. Scalabrini Ortiz 265",
    coords: [-34.5970, -58.4308],
    reserva: "walkin",
    indicacao: "Bia (faz questão)",
    destaque: true,
    fechaDom: true,
    notas: "Vestidos leves 'bem verão', estampas femininas. Sáb 10h-19h (fecha cedo). Conferir Insta @mantonietaind.",
  },
  {
    id: "monoblock",
    nome: "Monoblock",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4833, Palermo Soho",
    coords: [-34.5867, -58.4307],
    reserva: "walkin",
    indicacao: "Bia (faz questão)",
    destaque: true,
    notas: "Cadernos, agendas e papelaria com estampas autorais — a cara de BA. Sáb 11h-20h, dom 12h-20h.",
  },
  {
    id: "rapsodia",
    nome: "Rapsodia",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Honduras 4872, Palermo Soho",
    coords: [-34.5869, -58.4296],
    reserva: "walkin",
    indicacao: "Bia",
    notas: "Boho/estampas/sedas. Loja-conceito grande, vale entrar pelo ambiente. Sáb 10h-21h.",
  },
  {
    id: "boken",
    nome: "Boken",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "El Salvador 4644, Palermo",
    coords: [-34.5891, -58.4288],
    reserva: "walkin",
    indicacao: "Bia",
    fechaDom: true,
    notas: "Jeans e couro argentino. Sáb 12h-20h.",
  },
  {
    id: "las-pepas",
    nome: "Las Pepas",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Gurruchaga 1580, Palermo",
    coords: [-34.5878, -58.4297],
    reserva: "walkin",
    indicacao: "Bia",
    fechaDom: true,
    notas: "Moda feminina argentina. Sáb 10h-20h.",
  },
  {
    id: "vero-alfie",
    nome: "Vero Alfie",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Armenia 1655, Palermo",
    coords: [-34.5876, -58.4283],
    reserva: "walkin",
    indicacao: "Bia",
    fechaDom: true,
    notas: "Sáb ~11h-20h.",
  },
  {
    id: "de-miracolo",
    nome: "De Miracolo",
    tipo: "compras",
    bairro: "Palermo Soho",
    endereco: "Palermo (conferir Insta @demiracolo)",
    coords: [-34.5870, -58.4290],
    reserva: "walkin",
    indicacao: "Bia",
    notas: "Estética mais 'fun'. Conferir endereço atual no Insta antes.",
  },
  {
    id: "maison-mimmi",
    nome: "Maison Mimmi",
    tipo: "compras",
    bairro: "Recoleta",
    endereco: "Parera 46, Recoleta",
    coords: [-34.5895, -58.3935],
    reserva: "walkin",
    indicacao: "Bia",
    notas: "Fica em Recoleta — fora da rota Palermo. Encaixar na manhã de sábado se for fazer Recoleta.",
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
    indicacao: "Bia (must-go)",
    destaque: true,
    notas: "Só domingo. Antiguidades, tango de rua, rua Defensa.",
  },
  {
    id: "plaza-mayo",
    nome: "Plaza de Mayo + Casa Rosada",
    tipo: "passeio",
    bairro: "Microcentro",
    endereco: "Plaza de Mayo, Microcentro",
    coords: [-34.6083, -58.3724],
    reserva: "walkin",
    indicacao: "Bia (must-go)",
    destaque: true,
    notas: "Casa Rosada (sede do governo), Catedral, Cabildo. Caminhada 15 min até San Telmo — encaixa no domingo de manhã.",
  },
  {
    id: "jardin-botanico",
    nome: "Jardín Botánico",
    tipo: "passeio",
    bairro: "Palermo",
    endereco: "Av. Santa Fe 3951, Palermo",
    coords: [-34.5810, -58.4119],
    reserva: "walkin",
    indicacao: "Bia (must-go)",
    notas: "Jardim botânico clássico de Palermo, entrada gratuita. Pertinho do hotel (~15 min a pé). Bom pra manhã leve.",
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
      { hora: "23:30", lugarId: null, titulo: "Check-in no Vain", desc: "Avisar o hotel com antecedência. Pegar chave, deixar mala." },
      { hora: "00:00", lugarId: "gris-gris", titulo: "Drink no Gris Gris (opcional)", desc: "10 min do hotel, walk-in. Bar cool/disco.", alternativa: "Hotel + Rappi se cansado" },
    ],
  },
  {
    dia: "Sábado 16/05",
    titulo: "Don Julio + Florería",
    icone: "sun",
    itens: [
      { hora: "10:00", lugarId: "oli", titulo: "Café no Oli ⭐", desc: "12 min a pé ou 4 min Uber. Walk-in. Medialunas + flat white.", alternativa: "Tognis Café (Palermo, mais perto se quiserem dormir mais)" },
      { hora: "11:30", lugarId: null, titulo: "Manhã livre — escolher uma", desc: "A) 🌳 Jardín Botánico (15 min a pé do Vain) — passeio leve, gratuito.\n\nB) Recoleta European-vibez: Cemitério (Evita) + El Ateneo. ~2h, Uber 15 min até lá.\n\nC) Bosques de Palermo + Jardín Japonés — ar livre, mais relaxante.", alternativa: "Caminhada lenta por Palermo Soho (Honduras / El Salvador) se quiserem ficar leves" },
      { hora: "14:45", lugarId: null, titulo: "Direto pro Don Julio", desc: "Não passa no hotel — vão como estão. Caminhada 7 min do Vain ou Uber rápido se vier de Recoleta." },
      { hora: "15:00", lugarId: "don-julio", titulo: "🥩 DON JULIO (RESERVADO)", desc: "Chegar 14:50. Tolerância 15 min. Ver sugestões de pedido no card.", destaque: true, alternativa: "La Cabrera (walk-in cedo, 19h) ou Elena no Four Seasons" },
      { hora: "17:30", lugarId: null, titulo: "Hotel — banho e troca pra noite", desc: "Volta do Don Julio (7 min a pé). 25 min pra trocar e respirar." },
      { hora: "18:00", lugarId: "maria-antonieta", titulo: "🛍️ Maria Antonieta (Bia)", desc: "Uber 7 min até Scalabrini Ortiz 265. FECHA 19h — primeira parada por isso. Domingo não abre." },
      { hora: "18:40", lugarId: "vintage-hole", titulo: "🛍️ The Vintage Hole (Bia)", desc: "Caminhada 5 min de Maria Antonieta. Vintage de luxo: Chanel, Dior, YSL second-hand. Domingo NÃO abre.", alternativa: "Lourenço: drink no Tres Monos (Guatemala 4699) ou Aldo's Vinoteca enquanto Bia faz o tour" },
      { hora: "19:45", lugarId: null, titulo: "Uber direto pro Florería", desc: "15 min até Arroyo 872, Retiro. Não passa no hotel." },
      { hora: "20:30", lugarId: "floreria", titulo: "🍸 Florería Atlántico", desc: "Walk-in. Chegar 20:30 pra evitar fila. ~2-2h30 no local.", destaque: true, alternativa: "Tres Monos (Guatemala 4699) ou CoChinChina — sem fila" },
      { hora: "23:00", lugarId: null, titulo: "Pós-Florería — escolher", desc: "A) Norimoto (japa, walk-in até 00h)\nB) CoChinChina (bar autoral)\nC) Uptown (balada)\nD) Hotel + dormir" },
    ],
  },
  {
    dia: "Domingo 17/05",
    titulo: "El Preferido + voo",
    icone: "plane-takeoff",
    itens: [
      { hora: "09:30", lugarId: null, titulo: "Acorda + arruma malas", desc: "Tudo pronto pra deixar no luggage storage." },
      { hora: "10:00", lugarId: "cuervo", titulo: "Café no Cuervo ⭐", desc: "7 min a pé do Vain. Avocado toast, alfajor, flat white.", alternativa: "Tognis Café (Palermo, walk-in)" },
      { hora: "11:00", lugarId: null, titulo: "Checkout + luggage storage", desc: "Malas ficam no Vain até 17:45." },
      { hora: "11:30", lugarId: null, titulo: "Uber pra Plaza de Mayo", desc: "~20 min do hotel até o Microcentro. Domingo o centro fica vazio, agradável." },
      { hora: "12:00", lugarId: "plaza-mayo", titulo: "🏛️ Plaza de Mayo + Casa Rosada", desc: "Foto da Casa Rosada (sede do governo), Catedral, Cabildo. ~30-40 min." },
      { hora: "12:40", lugarId: null, titulo: "Caminhada até San Telmo", desc: "15 min pela rua Defensa — já vai cruzando o coração do bairro antigo." },
      { hora: "13:00", lugarId: "san-telmo", titulo: "Feira de San Telmo 🌟", desc: "Plaza Dorrego. Antiguidades, tango de rua, lojinhas. ~1h.", alternativa: "Mercat Villa Crespo (mercado gastronômico) se quiserem pular feira" },
      { hora: "14:00", lugarId: null, titulo: "Uber pra Palermo Soho", desc: "~20 min até as lojas e El Preferido." },
      { hora: "14:20", lugarId: "monoblock", titulo: "🛍️ Monoblock (Bia)", desc: "El Salvador 4833. Papelaria autoral. 15-20 min. Aberto dom 12h-20h." },
      { hora: "14:40", lugarId: "jazmin-chebar", titulo: "🛍️ Jazmin Chebar (Bia)", desc: "1 quadra de Monoblock (El Salvador 4702). Moda statement. Aberto dom 13h-19h.", alternativa: "Se sobrar tempo: Rapsodia (Honduras 4872) na mesma rota" },
      { hora: "15:00", lugarId: "el-preferido", titulo: "🥩 EL PREFERIDO (RESERVADO)", desc: "Sair 17:30 no máximo — voo é 21:55.", destaque: true, alternativa: "La Cabrera ou Fervor Brasas (Recoleta) se cancelar" },
      { hora: "17:30", lugarId: null, titulo: "Sai do El Preferido", desc: "Pula sobremesa se atrasar." },
      { hora: "17:45", lugarId: null, titulo: "Hotel: pega malas", desc: "Conferir passaporte antes de chamar o Cabify." },
      { hora: "18:15", lugarId: null, titulo: "Cabify pra Ezeiza (LIMITE)", desc: "45-60 min até o aeroporto." },
      { hora: "19:30", lugarId: null, titulo: "Chega Ezeiza", desc: "Check-in, segurança." },
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
  confirmada: { label: "Reservado", cor: "#3a8865" },
  walkin: { label: "Walk-in", cor: "#888" },
};
