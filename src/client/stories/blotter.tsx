import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { DateCell, NotionalCell } from '../src/ui/operations'
import Blotter from '../src/ui/operations/Blotter'
import blottersProps from './blotter/blottersProps'

storiesOf('Blotter', module)
  .add('Full Blotter', () =>
    <Blotter {...blottersProps} />)
  .add('Date cell', () =>
    <div style={{ background: '#FFFFFF' }}>
      <DateCell dateValue={new Date()} width={200} classname={''}/>
    </div>)
  .add('Notional cell', () =>
    <div style={{ background: '#FFFFFF' }}>
      <NotionalCell
        className="blotter__trade-field--align-right"
        notionalValue={200}
        suffix={' GBP'} width={200}/>
    </div>)
