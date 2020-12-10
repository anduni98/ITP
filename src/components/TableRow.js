import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';




class TableRow extends Component {


    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/business/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }




    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.gift_voucher_name}
                </td>
                <td>
                    {this.props.obj.gift_voucher_code}
                </td>
                <td>
                    {this.props.obj.gift_voucher_price}
                </td>
                <td>
                    {this.props.obj.gift_voucher_release_date}
                </td>
                <td>
                    {this.props.obj.gift_voucher_expire_date}
                </td>
                <td>
                    {this.props.obj.gift_voucher_issue_or_not}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default TableRow;