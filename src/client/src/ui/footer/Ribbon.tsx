import * as React from 'react'
import styled, { css } from 'react-emotion'
import ArrowUpward from 'material-ui-icons/ArrowUpward'

const Ribbon = styled('footer')`
  color: white;
  line-height: 1.25rem;
  justify-content: center;
  min-width: 100%;
  width: 100%;
  min-height: 3.4rem;
  background-image: linear-gradient(to left, #00265d, #00204f);
  padding: 10px 20px
`

const padding = css`
  padding-right: 0.4rem;
`

const SuperText = styled('small')`
  line-height: 1em;

  &:after,
  &:before {
    display: inline-block;
    vertical-align: super;
    font-size: 1rem;
    line-height: 1;

    height: 0;
    max-height: 0;
  }
`

const Name = styled('small') `
  ${padding}

  font-weight: bold;
  text-transform: uppercase;
`

const Currency = styled(SuperText)`
  ${padding}
  
  &:before {
    content: "$";
    font-size: 0.5rem;
    padding-right: 0.25rem;
  }
`

const Status = styled('span')`
  color: ${ props => props.theme.colors.positive }
`

const Change = styled('small')``

type ComponentProps = {
  className?: string,
  children?: {}
}

const ChangeIcon = () => (
  <ArrowUpward style={{fontSize: '12px'}} />
)

const VerticalRule: React.SFC = ({ className }: ComponentProps) => (
  <svg
    className={className}
    width="8"
    height="12"
    viewBox="0 0 8 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4,4 L4,24"
      stroke="#000"
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
      opacity=".5"
      strokeLinecap="square"
    />
  </svg>
)

type StyledComponentProps = {
  theme?: object
} & ComponentProps

const VerticalRuleStyled = styled<StyledComponentProps, ComponentProps>(VerticalRule)`
  > path {
    stroke: ${ props => props.theme.colors.positive };
  }
`

const Percent = styled(SuperText)`
  &:after {
    content: "%";
    font-size: 0.5rem;
    padding-left: 0.125rem;
  }
`

const Market = styled('span')`
  padding-right: 1rem;
`

const MarketList = () => {
  const data = [
    { name: 'Nasdaq', latestPrice: '6,850.05', change: '72.89', changePercent: '1.08' },
    { name: 'Dija', latestPrice: '6,850.05', change: '72.89', changePercent: '1.08' },
    { name: 'S&P', latestPrice: '6,850.05', change: '72.89', changePercent: '1.08' },
  ]

  const marketList = data.map(({ name, latestPrice, change, changePercent }, i) => (
    <Market key={i}>
      <Name>{name}</Name>
      <Currency>{latestPrice}</Currency>
      <Status>
        <Change>
          <ChangeIcon />
          {change}
        </Change>
        <VerticalRuleStyled />
        <Percent>{changePercent}</Percent>
      </Status>
    </Market>
  ))

  return (
    <div>
      {marketList}
    </div>
  )
}

export default () => {
  return (
    <Ribbon>
      <small>US MARKET</small>
      <MarketList/>
    </Ribbon>
  )
}
