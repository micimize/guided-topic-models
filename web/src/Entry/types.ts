import * as t from 'io-ts'

const Label = t.interface({
  topic: t.string,
  end: t.number
})

type Label = t.TypeOf<typeof Label>

const Entry = t.interface({
  text: t.string,
  labels: t.array(Label)
})

type Entry = t.TypeOf<typeof Entry>

const EntryPage = t.interface({
  entries: t.array(Entry),
  next: t.string
})

type EntryPage = t.TypeOf<typeof EntryPage>

export {
  Label,
  Entry,
  EntryPage
}
