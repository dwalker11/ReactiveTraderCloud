import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import NotionalInput from './NotionalInput'
import { NotionalUpdate, onNotionalInputChange } from '../../../redux/ui_spotTile_notional'
import { CurrencyPair } from '../../../types'

interface NotionalContainerOwnProps {
  className: string
  currencyPair: CurrencyPair
}

interface NotionalContainerStateProps {
  notionals: any
}

interface NotionalContainerDispatchProps {
  onNotionalInputChange: (payload: NotionalUpdate) => void
}

type NotionalContainerProps = NotionalContainerOwnProps & NotionalContainerStateProps & NotionalContainerDispatchProps

class NotionalContainer extends React.Component<NotionalContainerProps, any> {
  render() {
    const notional = this.props.notionals[this.props.currencyPair.symbol] || 1000000
    const currencyPairSymbol = this.props.currencyPair.symbol
    return (
      <NotionalInput
        className={this.props.className}
        notional={notional}
        currencyPair={this.props.currencyPair}
        onNotionalInputChange={(value: number) =>
          this.props.onNotionalInputChange({
            currencyPairSymbol,
            value
          })
        }
      />
    )
  }
}

const mapStateToProps = ({ notionals }) => ({ notionals })

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      onNotionalInputChange
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(NotionalContainer)
