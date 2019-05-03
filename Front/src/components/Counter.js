import React from 'react';


export default class Counter extends React.Component {


    getDefaultProps() {
        return {
          length: 0
        };
      }

    render () {
        return (

            <span>{this.props.length} character(s)</span>
        )
      }
}