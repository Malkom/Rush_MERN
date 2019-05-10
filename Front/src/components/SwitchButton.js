import React from 'react';


export default class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.NotFollow = this.NotFollow.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.follow();
    }

    NotFollow(e)
    {
        e.preventDefault();
        this.props.unfollow(this.props.id);
    }

    render () {
        let value = '';
        let className = '';
        let onSubmit = null;
        //console.log(this.props.id);
        if(this.props.bool === true)
        {
            value = 'Unfollow';
            className = 'btn btn-outline-primary';
            onSubmit = this.NotFollow;
        }
        else
        {
            value = 'Follow';
            className = 'btn btn-primary';
            onSubmit = this.onSubmit;
        }
        return (
            <td className="col-lg-4">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="submit" value={value} className={className}/>
                </div>
            </form>
            </td>
        )
      }
}