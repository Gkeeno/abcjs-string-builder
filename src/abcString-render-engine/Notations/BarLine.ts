import { NewLine } from '../utils'
import { Notation } from './Notation.abstract'
import { BarlineType } from '../Enums/BarlineType'
import { SymbolSpacer } from '../constant'
import { NotationType } from '../Enums/NotationType'
import { NotationSerializeInfo } from '../common'

export class BarLine extends Notation {
  public ntype = NotationType.BarLine

  constructor(
    public type: BarlineType = BarlineType.SingleBarline,
    public hasNewlineInEnd: boolean = false,
    public repeatsNumber: number = 0,
  ) {
    super()
  }

  public static deserialize(seriInfo: NotationSerializeInfo) {
    return new BarLine(...seriInfo.state)
  }
  
  public toJSON() {
    return {
      ntype: this.ntype,
      state: [this.type, this.hasNewlineInEnd, this.repeatsNumber],
    }
  }

  public toAbcString() {
    return (
      SymbolSpacer + // 防止粘滞到一起出现非预期的展示
      (this.type === BarlineType.SingleBarline
        ? '|'
        : this.type === BarlineType.DoubleBarline
        ? '||'
        : this.type === BarlineType.ThickThin_DoubleBarline
        ? '[|'
        : this.type === BarlineType.ThinThick_DoubleBarline
        ? '|]'
        : this.type === BarlineType.RepeatedSetion_Start
        ? '|:'
        : this.type === BarlineType.RepeatedSetion_End
        ? ':|'
        : this.type === BarlineType.RepeatedSetion_StartAndEnd
        ? '::'
        : '|') +
      (this.repeatsNumber ? this.repeatsNumber : '') +
      (this.hasNewlineInEnd ? NewLine : '') 
    )
  }

  public query(param): boolean {
    if (!param.ichar_end) {
      return false
    }

    return (
      // 因为abcjs选中回调中 不包括分割符号
      this.ibegin + SymbolSpacer.length === param.ichar_start &&
      // 因为abcjs选中回调中 不包括换行符，所以带换行符的符号要比实际少1，但是内部索引操作还是正常使用
      this.iend + (this.hasNewlineInEnd ? -1 : 0) === param.ichar_end
    )
  }

  public setNewlineInEnd() {
    this.hasNewlineInEnd = true
    this.updateInStave()
  }

  public setBarlineType(newtype: BarlineType) {
    this.type = newtype
    this.updateInStave()
  }

  public setRepeatsNumber(serialNumber:number) {
    this.repeatsNumber = serialNumber
    this.updateInStave()
  }
}
