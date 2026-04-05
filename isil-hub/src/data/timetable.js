export const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi']

export const TIMES = [
  '8:00–9:30',
  '9:40–11:10',
  '11:20–12:50',
  '13:00–14:30',
  '14:40–16:10',
]

export const SESSION_COLORS = {
  Cours: '#6172f3',
  TD: '#10b981',
  TP: '#f59e0b',
}

/** @type {Record<string, Array<Array<{groups: string[], type: string, mod: string}>>>} */
export const TIMETABLE = {
  Dimanche: [
    [],
    [{ groups: ['ALL'], type: 'Cours', mod: 'THG' }],
    [],
    [],
    [],
  ],
  Lundi: [
    [{ groups: ['G2'], type: 'TP', mod: 'SYS' }, { groups: ['G1'], type: 'TP', mod: 'BD' }],
    [{ groups: ['G2'], type: 'TP', mod: 'BD' }, { groups: ['G1'], type: 'TP', mod: 'SYS' }],
    [{ groups: ['G4'], type: 'TP', mod: 'BD' }, { groups: ['G3'], type: 'TP', mod: 'P.WEB' }, { groups: ['G4'], type: 'TP', mod: 'SYS' }],
    [{ groups: ['G3'], type: 'TP', mod: 'BD' }, { groups: ['G4'], type: 'TP', mod: 'P.WEB' }],
    [{ groups: ['ALL'], type: 'Cours', mod: 'P.WEB' }],
  ],
  Mardi: [
    [],
    [{ groups: ['ALL'], type: 'Cours', mod: 'THG' }],
    [{ groups: ['ALL'], type: 'Cours', mod: 'BD' }],
    [{ groups: ['G1'], type: 'TD', mod: 'BD' }, { groups: ['G2'], type: 'TP', mod: 'P.WEB' }, { groups: ['G3'], type: 'TD', mod: 'THG' }],
    [{ groups: ['G1'], type: 'TP', mod: 'P.WEB' }, { groups: ['G2'], type: 'TD', mod: 'BD' }, { groups: ['G4'], type: 'TD', mod: 'THG' }],
  ],
  Mercredi: [
    [{ groups: ['ALL'], type: 'Cours', mod: 'SYS' }],
    [{ groups: ['ALL'], type: 'Cours', mod: 'BD' }],
    [{ groups: ['G1'], type: 'TD', mod: 'GL' }, { groups: ['G2'], type: 'TD', mod: 'ARCHI' }, { groups: ['G3'], type: 'TD', mod: 'BD' }, { groups: ['G4'], type: 'TD', mod: 'SYS' }],
    [{ groups: ['G1'], type: 'TD', mod: 'ARCHI' }, { groups: ['G2'], type: 'TD', mod: 'GL' }, { groups: ['G3'], type: 'TD', mod: 'SYS' }, { groups: ['G4'], type: 'TD', mod: 'BD' }],
    [],
  ],
  Jeudi: [
    [{ groups: ['G1'], type: 'TD', mod: 'THG' }, { groups: ['G2'], type: 'TD', mod: 'SYS' }, { groups: ['G3'], type: 'TD', mod: 'ARCHI' }, { groups: ['G4'], type: 'TD', mod: 'GL' }],
    [{ groups: ['G1'], type: 'TD', mod: 'SYS' }, { groups: ['G2'], type: 'TD', mod: 'THG' }, { groups: ['G3'], type: 'TD', mod: 'GL' }, { groups: ['G4'], type: 'TD', mod: 'ARCHI' }],
    [{ groups: ['ALL'], type: 'Cours', mod: 'ARCHI' }],
    [{ groups: ['ALL'], type: 'Cours', mod: 'GL' }],
    [],
  ],
}

export const GROUPS = ['G1', 'G2', 'G3', 'G4']
