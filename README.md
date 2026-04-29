# abcjs-string-provider

面向 [abcjs](https://github.com/paulrosen/abcjs) 的 ABC 字符串构建工具。项目用 TypeScript 把谱面信息、音符、休止符、小节线、和弦、歌词等元素封装为对象，调用对象方法时同步生成可交给 abcjs 渲染和播放的 `abcString`。

仓库同时包含一个 Vue 2 示例编辑器，用来验证单手谱、双手谱、点击选中、快捷键改音高、MIDI 播放高亮、谱面状态保存/加载等交互。

## 安装

```bash
npm i abcjs-string-provider
```

## 基本用法

```ts
import { Stave, Note, NoteKey } from 'abcjs-string-provider'

const stave = new Stave().init()
stave.addNotation(new Note(NoteKey.C3))

console.log(stave.abcString)
```

## 当前能力

- 支持单声部 `Stave` 与钢琴双声部 `StaveDoubleTrack`。
- 支持基础谱头信息：标题、作者、速度、拍号、调号、单位音长。
- 支持音符、休止符、和弦、小节线、反复小节线、延音、圆滑线和歌词。
- 支持编辑状态序列化/反序列化，便于保存后重新加载。
- 示例页面可通过 abcjs 渲染五线谱，并使用 abcjs MIDI 播放。

## 本地开发

```bash
npm install
npm run serve
```

发布包内容通过 TypeScript 编译生成：

```bash
npm run build:publish
```

## 后续方向

- 为 `abcString` 生成、插入/删除索引维护、序列化恢复补充单元测试。
- 收敛公共 API 与类型声明，明确哪些类/枚举属于稳定导出。
- 继续完善双手谱、更多调性、更多装饰音和复杂节奏支持。
- 将示例编辑器中的交互经验沉淀为可复用的编辑器能力。
