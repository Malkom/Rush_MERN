import React from 'react';


export default class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit1 = this.onSubmit1.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.follow();
    }

    onSubmit1(e)
    {
        e.preventDefault();
        this.props.unfollow(this.props.id);
    }

    render () {
        let memberId = this.props.id
        let button = (this.props.array.indexOf(memberId) !== -1) ? 
        <form onSubmit={this.onSubmit1}>
            <div className="form-group">
                <input type="submit" value="Unfollow" className="btn btn-outline-primary"/>
            </div>
        </form> :
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="submit" value="Follow" className="btn btn-primary"/>
            </div>
        </form>;
        return (
            <td className="col-lg-4">
            {button}
            </td>
        )
      }
}