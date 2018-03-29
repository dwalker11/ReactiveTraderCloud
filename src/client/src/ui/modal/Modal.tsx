import * as React from 'react'
import styled from 'react-emotion'

import './ModalStyles.scss'

const ModalOverlay = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: .7;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
`

const Modal = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 600px;
  height: 150px;
  margin: auto;
  background-color: white;
  text-align: center;
  z-index: 101;
`

const ModalHeader = styled('div')`
  border-bottom: 1px solid #da4d2e;
`

const ModalHeaderTitle = styled('span')`
  display: inline-block;
  padding: 5px;
`

const ModalBody = styled('div')`
  padding: 5px;
`

export interface ModalProps {
  shouldShow?: boolean
  title?: string
  children?: any
}

// TODO disable tabbing outside of the modal
// tslint:disable-next-line:variable-name
export default function(props: ModalProps) {
  if (!props.shouldShow) {
    return null
  }

  return (
    <div>
      <ModalOverlay/>
      <Modal>
        <ModalHeader>
          <ModalHeaderTitle>
            {props.title}
          </ModalHeaderTitle>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
      </Modal>
    </div>
  )
}
