import { InfoFiledType } from '../Enums/InfoFieldType';
import { NewLine } from '../utils';
import { Notation } from './Notation.abstract';
import { NotationType } from '..';

export class InfoField extends Notation {
  public ntype = NotationType.InfoField;

  constructor(private fieldType: InfoFiledType = InfoFiledType.reference_number, private content: string = '') {
    super();
  }
  public toJSON() {
    return {
      ntype:this.ntype,
      state:[this.fieldType, this.content]
    };
  }

  public setContent(setter: (string) => string): InfoField;
  public setContent(setter: string): InfoField;
  public setContent(setter: string | ((str: string) => string)): InfoField {
    if (typeof setter === 'string') {
      setter as string;
      this.content = setter;
    } else if (typeof setter === 'function') {
      setter as Function;
      this.content = setter(this.content);
    }

    this.updateInStave();
    return this;
  }

  public getContent() {
    return this.content;
  }
  public toAbcString() {
    return this.fieldType + this.content + NewLine;
  }
}