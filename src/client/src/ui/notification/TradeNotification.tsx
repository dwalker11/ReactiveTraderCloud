import * as React from 'react'
import { Direction, Trade, TradeStatus } from '../../types'
import '../common/styles/_base.scss'
import '../common/styles/_fonts.scss'
import './TradeNotificationStyles.scss'
import styled, { css, cx } from 'react-emotion'

const Notification = styled('div')`
  height: 100vh;
  background-color: #262a33;
  user-select: none;
  position: relative;
`

const NotificationContent = styled('div')`
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
`

const notificationStatus = css`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 11px;
  color: #c2c5c9;
`

const notificationStatusDone = css`
  display: none;
`

const notificationStatusRejected = css`
  color: #d32121;
`

const notificationSummaryItems = css`
  padding: 0;
  margin: 0;
  list-style: none;
`

// TODO: how to represent nested style
// .notification__summary-items--rejected {
//   .notification__summary-item {
//     text-decoration: line-through;
//   }
// }
const notificationSummaryItemsRejected = css``

const NotificationDetailsItemsContainer = styled('div')`
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`

const notificationSummaryItem = css`
  color: #c2c5c9;
  line-height: 14px;
`

const NotificationSummaryItemDirection = styled('li')`
  ${notificationSummaryItem}
  font-family: BrandonMedium;
  text-transform: uppercase;
  font-size: 11px;
`

const NotificationSummaryItemNotional = styled('li')`
  ${notificationSummaryItem}
  color: #f8ab02;
`

const NotificationSummaryItemCurrency = styled('li')`
  ${notificationSummaryItem}
  font-size: 12px;
`

const NotificationDetailsItems = styled('ul')`
  flex: 1;
  padding: 0;
  margin-top: 1px;
`

const notificationDetailsItem = css`
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 12px;
`

const NotificationDetailsItemLabel = styled('li')`
  ${notificationDetailsItem}
  color: #c2c5c9;
  font-size: 9px;
  text-transform: uppercase;
  font-family: BrandonMedium;
`

const NotificationDetailsItemValue = styled('li')`
  ${notificationDetailsItem}
  color: white;
  font-size: 11px;
  text-transform: uppercase;
`

const notificationButtonDismiss = css`
  text-decoration: none;
  position: absolute;
  bottom: -5px;
  right: 0;
  color: inherit;
  color: #c2c5c9;
`

const notificationButtonDismissIcon = css`
  transform: rotate(45deg);
`

export interface TradeNotificationProps {
  message: Trade
  dismissNotification: any
}

export default class TradeNotification extends React.Component<TradeNotificationProps, {}> {
  render() {
    const trade = this.props.message
    const formattedValueDate = trade ? trade.valueDate : ''

    const statusClassName = cx(
      notificationStatus,
      {
        [notificationStatusDone]: trade.status === TradeStatus.Done,
        [notificationStatusRejected]: trade.status !== TradeStatus.Done,
      },
    )
    const tradeSummaryClasses = cx(
      notificationSummaryItems,
      {
        [notificationSummaryItemsRejected]: trade.status === TradeStatus.Rejected,
      },
    )

    const tradeStatus = trade.status === TradeStatus.Done ? trade.status : 'REJECTED'
    const direction = trade.direction === Direction.Buy ? 'Bought' : 'Sold'

    return (
      <Notification>
        <NotificationContent>
          <span className={statusClassName}>{tradeStatus}</span>
          <ul className={tradeSummaryClasses}>
            <NotificationSummaryItemDirection>{direction}</NotificationSummaryItemDirection>
            <NotificationSummaryItemNotional>{trade.dealtCurrency} {trade.notional}</NotificationSummaryItemNotional>
            <NotificationSummaryItemCurrency>vs {trade.termsCurrency}</NotificationSummaryItemCurrency>
          </ul>
          <NotificationDetailsItemsContainer>
            <NotificationDetailsItems>
              <NotificationDetailsItemLabel>Rate</NotificationDetailsItemLabel>
              <NotificationDetailsItemValue>{trade.spotRate}</NotificationDetailsItemValue>
            </NotificationDetailsItems>
            <NotificationDetailsItems>
              <NotificationDetailsItemLabel>Date</NotificationDetailsItemLabel>
              <NotificationDetailsItemValue>SP. {formattedValueDate}</NotificationDetailsItemValue>
            </NotificationDetailsItems>
            <NotificationDetailsItems>
              <NotificationDetailsItemLabel>Trade Id</NotificationDetailsItemLabel>
              <NotificationDetailsItemValue>{trade.tradeId}</NotificationDetailsItemValue>
            </NotificationDetailsItems>
          </NotificationDetailsItemsContainer>
          <a href="#" className={notificationButtonDismiss} onClick={() => this.props.dismissNotification()}>
            <i className={cx("fa fa-share", notificationButtonDismissIcon)}/>
          </a>
        </NotificationContent>
      </Notification>
    )
  }
}
