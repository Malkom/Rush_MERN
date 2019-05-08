import React, { Component } from 'react';

class TableLeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            login : '',
            email : ''
        };
    }

    render() {
        console.log(this.props.obj.id_leader);
        return (
            <tr className="row">
                {this.props.obj.id_leader.map(item => (
                    <td className="col-lg-8" key={item}>{item.login} </td>
                ))}
                {/*<td className="col-lg-4">*/}
                {/*    <form onSubmit={this.onFollow}>*/}
                {/*        <div className="form-group">*/}
                {/*            <input type="submit" value="Follow" className="btn btn-primary"/>*/}
                {/*        </div>*/}
                {/*    </form>*/}
                {/*</td>*/}
            </tr>
        );
    }
}

export default TableLeader;