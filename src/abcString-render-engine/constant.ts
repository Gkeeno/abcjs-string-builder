import { NoteKey } from './Enums/NoteKey';
import { NoteDuration } from './Enums/NoteDuration';
import { BarLine } from './Notations/BarLine';
import { InfoField } from './Notations/InfoField';
import { RestNote } from './Notations/RestNote';
import { Note } from './Notations/Note';

export const SequenceNoteKey: NoteKey[] = [
  NoteKey.C0,
  NoteKey.D0,
  NoteKey.E0,
  NoteKey.F0,
  NoteKey.G0,
  NoteKey.A0,
  NoteKey.B0,

  NoteKey.C1,
  NoteKey.D1,
  NoteKey.E1,
  NoteKey.F1,
  NoteKey.G1,
  NoteKey.A1,
  NoteKey.B1,

  NoteKey.C2, 
  NoteKey.D2,
  NoteKey.E2,
  NoteKey.F2,
  NoteKey.G2,
  NoteKey.A2,
  NoteKey.B2,

  NoteKey.C3,
  NoteKey.D3,
  NoteKey.E3,
  NoteKey.F3,
  NoteKey.G3,
  NoteKey.A3,
  NoteKey.B3,

  NoteKey.C4, // abcElem.pitches[0].pitch == 0
  NoteKey.D4,
  NoteKey.E4,
  NoteKey.F4,
  NoteKey.G4,
  NoteKey.A4,
  NoteKey.B4,

  NoteKey.C5, 
  NoteKey.D5,
  NoteKey.E5,
  NoteKey.F5,
  NoteKey.G5,
  NoteKey.A5,
  NoteKey.B5,

  NoteKey.C6, 
  NoteKey.D6,
  NoteKey.E6,
  NoteKey.F6,
  NoteKey.G6,
  NoteKey.A6,
  NoteKey.B6,
];

export const NoteDurationNameMap = {
  0.0625: NoteDuration.Sixteenth, // 1/16
  0.125: NoteDuration.Eighth,
  0.1875: NoteDuration.Eighth_dot1,
  0.25: NoteDuration.Quarter,
  0.375: NoteDuration.Quarter_dot1,
  0.5: NoteDuration.Half,
  1: NoteDuration.Whole
};