import { INotation } from './INotation';
import {
  StringsIndexChangeHandle,
  StaveCommand,
  UpdateAbcStringHandle
} from '../types_defined';
import { NotationType } from '../Enums/NotationType';

export abstract class Notation implements INotation {
  /**
   * gatter 只用来作hook,返回值不应该被改变
   */
  get ibegin() {
    return this._ibegin;
  }
  /**
   * gatter 只用来作hook,返回值不应该被改变
   */
  get iend() {
    return this._iend;
  }
  /**
   * 标志序列化前的类型
   */
  public abstract ntype: NotationType;
  protected _ibegin: number = 0;
  protected _iend: number = 0;
  protected _command: StaveCommand;

  constructor() {}

  public query(param: any): boolean {
    if (!param.ichar_end) {
      return false;
    }

    return this.ibegin === param.ichar_start && this.iend === param.ichar_end;
  }

  public addToStave(command: StaveCommand) {
    this._command = command;
    this._command.subscribeAbcStringIndexChange(this.stringIndexChangeHandle);
    this._command.updateAbcString(this.createUpdateAbcStringHandle());
  }
  public insertToStave(before: INotation, command: StaveCommand) {
    this._command = command;
    this._command.subscribeAbcStringIndexChange(this.stringIndexChangeHandle);
    this._command.updateAbcString(this.createUpdateAbcStringHandle(before));
  }
  public updateInStave() {
    this._command.updateAbcString(this.createUpdateAbcStringHandle());
  }
  public removeInStave() {
    this.toAbcString = () => ''; // 删除即更新为空字符串
    this._command.updateAbcString(this.createUpdateAbcStringHandle());
    this._command.unsubscribeAbcStringIndexChange();
  }

  public abstract toAbcString();
  public abstract toJSON();

  protected stringIndexChangeHandle: StringsIndexChangeHandle = (sender, e) => {
    const isExceedThisEnd = this._ibegin > e.org_iend;
    if (sender == this || !isExceedThisEnd) {
      // 除去本身触发这个事件的，没超过需要更新的结尾索引的
      return;
    }
    // 更新在abcString中的索引
    const change = e.iend - e.org_iend;
    this._ibegin += change;
    this._iend += change;
  }

  protected appendAbcStringHandle(): UpdateAbcStringHandle {
    const notationStr = this.toAbcString();
    return abcstr => {
      this._ibegin = abcstr.length;
      this._iend = this._ibegin + notationStr.length - 1;
      return {
        newStaveAbcString: abcstr + notationStr
      };
    };
  }
  protected insertAbcStringHandle(before: INotation): UpdateAbcStringHandle {
    const notationStr = this.toAbcString();
    // 插入到前一符号后
    return abcstr => {
      // a.拆分出前后字符串
      const forward = abcstr.substring(0, before.ibegin);
      const backend = abcstr.substring(before.iend + 1);
      // b.处理相关记录的索引
      const org_iend = before.iend;
      this._ibegin = before.iend + 1;
      this._iend = this._ibegin + notationStr.length - 1;

      return {
        newStaveAbcString: forward
          .concat(before.toAbcString())
          .concat(notationStr)
          .concat(backend),
        changesInfo: { org_iend, iend: this.iend, sender: this }
      };
    };
  }
  protected updateAbcStringHandle(): UpdateAbcStringHandle {
    const notationStr = this.toAbcString();
    // 已添加到 stave, 直接更新
    return abcstr => {
      // a.拆分出前后字符串
      const forward = abcstr.substring(0, this._ibegin);
      const backend = abcstr.substring(this._iend + 1);
      // b.处理相关记录的索引
      const org_iend = this._iend;
      this._ibegin = this._ibegin;
      this._iend = this._ibegin + notationStr.length - 1; // 删除的索引变化为 org_istar-1, 即iend - len 或 ibegin - 1

      return {
        newStaveAbcString: forward.concat(notationStr).concat(backend),
        changesInfo: { org_iend, iend: this.iend, sender: this }
      };
    };
  }

  protected createUpdateAbcStringHandle(
    before?: INotation
  ): UpdateAbcStringHandle {
    if (this._iend === 0) {
      // 尚未添加到 stave
      if (!before) {
        // 附加到最后
        return this.appendAbcStringHandle();
      } else {
        // 插入到前一符号后
        return this.insertAbcStringHandle(before);
      }
    } else {
      // 已添加到 stave, 直接更新
      return this.updateAbcStringHandle();
    }
  }
}