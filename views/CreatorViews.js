import React from 'react';
import PlayerViews from './PlayerViews';

const exports = {...PlayerViews};

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Creator">
        <h2>Creator </h2>
        {content}
      </div>
    );
  }
}

exports.GenerateToken = class extends React.Component {
  render() {
    const {parent, defaultMinPrice, standardUnit} = this.props;
    const MinPrice = (this.state || {}).MinPrice || defaultMinPrice;
    return (
      <div>
        <input
          type='number'
          placeholder={defaultMinPrice}
          onChange={(e) => this.setState({MinPrice: e.currentTarget.value})}
        /> {standardUnit}
        <br />
        <button
          onClick={() => parent.generateToken(wager)}
        >generate Token</button>
      </div>
    );
  }
}


exports.Generating = class extends React.Component {
  render() {
    return (
      <div>Generating your Token... please wait.</div>
    );
  }
}

export default exports;