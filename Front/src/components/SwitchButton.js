import React from 'react';
import axios from 'axios';


export default class SwitchButton extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.NotFollow = this.NotFollow.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
    /* console.log(this.state.login);
      console.log(this.props.obj._id); */
      const follow = {
        user_id: this.props.user_id,
        leader_id: this.props.id
        };

        axios.post('http://localhost:4242/follow', follow)
        .then((response) => {
            if (response.data.message === 'Successful Follow :D') {
                alert('Successful Follow :D')
            }
            else
            {
                //console.log(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    NotFollow(e)
    {
        e.preventDefault();
        //this.props.unfollow(this.props.id);
        axios.delete('http://localhost:4242/follow', {params: {id: this.props.id}})
        .then((response) => {
            if (response.data.message === 'Successful') {
                alert('You are not following this user.')
                if(this.props.update)
                {
                    this.props.update(this.props.index);
                }
            }
            else
            {
                console.log(response.data);
            }
        })
        .catch((error) => {
            console.error(error);
        });
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
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="submit" value={value} className={className}/>
                    </div>
                </form>
        )
      }
}