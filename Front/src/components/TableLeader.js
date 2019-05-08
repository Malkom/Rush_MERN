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
        return (
            <tr className="row">

                    <td className="col-lg-8"> {this.props.obj.login} </td>

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