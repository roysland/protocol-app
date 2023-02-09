import Dexie from 'dexie';
import { readable, writable } from 'svelte/store';

export const db = new Dexie('protocol');
db.version(1).stores({
  medicine: '++id, name, dosage, when, active, fromDate, toDate',
  stool: '++id, registerDate, stoolType, notes',
  supplements: '++id, name, active, when',
  medicineDiary: '++id, medicineId, checked, checkedDate',
  supplementsDiary: '++id, supplementId, checked, checkedDate',
  emotions: '++id, registerDate, emotion',
  vitality: '++id, registerDate, mood, energy, physical, mental, appetite',
});
export const toasts = writable([])
export const stoolTypes = readable([
  {
    name: 'Harde klumper',
    bristolValue: 1,
    description: 'Forstoppet',
    image: 'stool-type-1.png'
  },
  {
    name: 'Klumpete kabel',
    bristolValue: 2,
    description: 'Forstoppet',
    image: 'stool-type-2.png'
  },
  {
    name: 'Kabel med tekstur',
    bristolValue: 3,
    description: 'Normal',
    image: 'stool-type-3.png'
  },
  {
    name: 'Myk kabel',
    bristolValue: 4,
    description: 'Normal',
    image: 'stool-type-4.png'
  },
  {
    name: 'Myke småbiter',
    bristolValue: 5,
    description: 'Løs mage',
    image: 'stool-type-5.png'
  },
  {
    name: 'Grøtete',
    bristolValue: 6,
    description: 'Diaré',
    image: 'stool-type-6.png'
  },
  {
    name: 'Vannete',
    bristolValue: 7,
    description: 'Ekstrem diaré',
    image: 'stool-type-7.png'
  }
])
export const whens = [
  { value: 'Morgen', name: 'Morgen (06-10)', hourStart: 6 },
  { value: 'Formiddag', name: 'Formiddag (11-14)', hourStart: 11 },
  { value: 'Ettermiddag', name: 'Ettermiddag (15-19)', hourStart: 15 },
  { value: 'Kveld', name: 'Kveld (20-24)', hourStart: 20 },
  { value: 'til måltid', name: 'Etter måltid' }
]

export const whenIsNow = () => {
  const now = new Date().getHours()
  if (now > 0) {
    return whens[0]
  }
  if (now > 10) {
    return whens[1]
  }
  if (now > 14) {
    return whens[2]
  }
  if (now > 19) {
    return whens[3]
  }
  return null
}