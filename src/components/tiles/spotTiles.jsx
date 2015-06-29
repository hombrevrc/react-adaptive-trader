'use strict'

import React from 'react'
import SpotTile from './spotTile.jsx'
import { referenceDataService } from 'services/index.js'

export default class SpotTiles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currencyPairs: []
    }
  }

  componentDidMount() {
    referenceDataService.getCurrencyPairUpdatesStream()
      .subscribe(u => {
        this.props.loaded()
        console.log('Spot tiles loaded');

        this.setState({
          isLoading: false,
          currencyPairs: u.map(c => c.currencyPair)
        })
      })
  }

  render() {
    return (
      <div style={{overflow: 'auto'}}>
        <ul style={{listStyle: 'none'}}>
          {this.state.currencyPairs.map(c => (
            <li style={{padding: '0 15px 12px 15px'}} key={c.symbol}><SpotTile ccyPair={c} /></li>)
          )}
        </ul>
      </div>
    )
  }
}

SpotTiles.propTypes = {
  loaded: React.PropTypes.func.isRequired
}
