import React from 'react'
import { Text } from 'react-native'

export const typography = () => {
  const oldRender = Text.render
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: 'Roboto' }, origin.props.style]
    })
  }
}