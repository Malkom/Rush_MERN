import React from 'react';


export default class Textarea extends React.Component {

    render () {
        return (
            <textarea id= "textarea"style={{height: 100, width: 550}}
            type="text" maxLength="140" className="form-control" onChange={this.props.onChangeDescription}/>

        )
      }
}