export interface MockNote {
  id: string;
  content: string;
  timestamp: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentType?: string;
  attachmentSize?: string;
}

export interface MockCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  lastMessage: string;
  lastDate: string;
  notes: MockNote[];
}

export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: '1',
    name: 'AppGasto&Informatica&Laboral',
    color: '#7C3AED',
    icon: '💼',
    lastMessage: 'Tú: EA 100 IC; IQ: tener multiples cuentas dg...',
    lastDate: 'jueves',
    notes: [
      {
        id: '1a',
        content: 'mejores horas para programar (europa, nueva york y los angeles fuera de horario laboral): 18:00 a 2:00 chile de lunes a jueves(8 hh)\n\nviernes 18 a 12:00,\n\nsabados, domingos todo el dia :)',
        timestamp: '01:53 PM',
      },
      {
        id: '1b',
        content: 'malos horarios de 2:00 am a 18 pm (estan trabajando a esa hora, por ejemplo a las 2am de aqui son las 8am de allá y empieza la carga laboral intensa...)',
        timestamp: '01:53 PM',
      },
      {
        id: '1c',
        content: 'COMPILAO',
        timestamp: '01:53 PM',
      },
      {
        id: '1d',
        content: 'Subir la demo en otra cuenta',
        timestamp: '01:54 PM',
      },
      {
        id: '1e',
        content: 'IDEA 1000 IQ: tener multiples cuentas de git, pero compartir proyectos entre ellas para asi sea posible editar en una session el mismo proyecto!!!!! y asi separo en ramas o algo asi',
        timestamp: '01:54 PM',
      },
    ],
  },
  {
    id: '2',
    name: 'Smash&Apps-apunte',
    color: '#3B82F6',
    icon: '🎮',
    lastMessage: 'Tú: https://www.desktophut.com/FGO-SCxc...',
    lastDate: 'jueves',
    notes: [
      {
        id: '2a',
        content: 'Recordar revisar nueva actualización del juego',
        timestamp: '02:15 PM',
      },
    ],
  },
  {
    id: '3',
    name: 'Gastos&Notas&Organiz&Varios',
    color: '#10B981',
    icon: '📁',
    lastMessage: 'Tú: .',
    lastDate: 'jueves',
    notes: [
      {
        id: '3a',
        content: 'Realista: boton de sincronizacion y alli cortamos el Churro.',
        timestamp: '1:56 PM',
        hasAttachment: true,
        attachmentName: 'CuentasYChips.docx',
        attachmentType: 'DOCX',
        attachmentSize: '14 KB',
      },
      {
        id: '3b',
        content: 'Voy bien, pero ramhien debi avanzar. D forma real',
        timestamp: '1:56 PM',
      },
      {
        id: '3c',
        content: 'Separar mis backups entre el creador y backup_coientes',
        timestamp: '1:56 PM',
      },
      {
        id: '3d',
        content: 'Debo tener sincro de transacciones y usuario cloud',
        timestamp: '1:56 PM',
      },
      {
        id: '3e',
        content: 'En la de notas sincro tota pero un boton tmbién es todo',
        timestamp: '1:56 PM',
      },
    ],
  },
  {
    id: '4',
    name: 'Salud&Dieta&Ergonomia&Alimentacion',
    color: '#F59E0B',
    icon: '🥗',
    lastMessage: 'Tú: .',
    lastDate: 'jueves',
    notes: [
      {
        id: '4a',
        content: 'Revisar dieta semanal y ajustar macros',
        timestamp: '10:30 AM',
      },
    ],
  },
  {
    id: '5',
    name: 'Hobbie:Pkgo/MusicProy/Juegos',
    color: '#EC4899',
    icon: '🎵',
    lastMessage: 'Tú: ;',
    lastDate: 'jueves',
    notes: [
      {
        id: '5a',
        content: 'Nuevo proyecto musical: mezclar beats con sonidos ambientales',
        timestamp: '09:00 AM',
      },
    ],
  },
];
