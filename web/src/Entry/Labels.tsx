import * as React from 'react'

namespace Labels {
  export type Data = {
    text: string,
    labels: Array<{topic: string, start: number, end: number}>
  }
  export type Props = Data
}

function applyLabels({ text, labels }: Labels.Props) {
  let labeled: Array<{ topic: string | null, text: string }> = []
  let previousEndExclusive = 0
  for (let { topic, start, end } of labels.sort((a, b) => a.start - b.start)) {
    if (previousEndExclusive > start) {
      throw Error('overlapping topics not allowed')
    } else if (previousEndExclusive < start) {
      labeled.push({ topic: null, text: text.slice(previousEndExclusive, start)})
    }
    labeled.push({ topic, text: text.slice(start, end + 1)})
    previousEndExclusive = end + 1
  }
  return labeled
}

/*
 * Highlights text with the given labels
 */
function Labels(props: Labels.Props) {
  return (
    <p className="labeled">{applyLabels(props).map(({ topic, text }, i) =>
      <span key={i} className={topic || ''}>{text}</span>
    )}</p>
  )
}

export default Labels