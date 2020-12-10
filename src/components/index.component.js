import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {business: []};
    }
    componentDidMount(){
        axios.get('http://localhost:4000/business')
            .then(response => {
                this.setState({ business: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow(){
        return this.state.business.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    //Report generation part starting from here

    exportGiftVouchersPDF = () => {

        console.log( "Report Downloaded" )





        const unit = "pt";

        const size = "A3"; // Use A1, A2, A3 or A4

        const orientation = "landscape"; // portrait or landscape

        const marginLeft = 40;

        const doc = new jsPDF( orientation, unit, size );



        // const jsPDF = require('jspdf');

        // require('jspdf-autotable');



        const title = "Gift Vouchers Details Report ";

        const headers = [["Gift Voucher Name","Gift Voucher Code","Gift Voucher Price","Gift Voucher Release Date","Gift Voucher Expire Date","Gift Voucher is Issued/Not"]];



        // const Order = this.state.Order.map( orderList => [orderList.order_id, orderList.product_id,orderList.productname,orderList.brand, orderList.total_amount, orderList.qty,orderList.email,orderList.address,orderList.purchase_date] );



        const Vouchers = this.state.business.map(

            business=>[

                business.gift_voucher_name,

                business.gift_voucher_code,

                business.gift_voucher_price,

                business.gift_voucher_release_date,

                business.gift_voucher_expire_date,

                business.gift_voucher_issue_or_not

            ]

        );



        let content = {

            startY: 50,

            head: headers,

            body: Vouchers

        };

        doc.setFontSize( 20 );

        doc.text( title, marginLeft, 40 );

        require('jspdf-autotable');

        doc.autoTable( content );

        doc.save( "Gift Vouchers.pdf" )

    }

    tabRow2(){
        return this.state.business.map(function (object,currentbussiness,i){
            return <TableRow obj={object} bussiness={currentbussiness} key={i}/>;

        })
    }

    searchGiftVoucherList(){
        return this.state.business.map((currentbussiness) => {
            if (
                this.state.searchGiftVoucherCode == currentbussiness.gift_voucher_code
            ){
                return(
                    <tr>
                        <td>{currentbussiness.gift_voucher_name}</td>
                        <td>{currentbussiness.gift_voucher_code}</td>
                        <td>{currentbussiness.gift_voucher_price}</td>
                        <td>{currentbussiness.gift_voucher_release_date}</td>
                        <td>{currentbussiness.gift_voucher_expire_date}</td>
                        <td>{currentbussiness.gift_voucher_issue_or_not}</td>
                    </tr>
                );
            }
        });
    }



    render() {
        return (
            <div>
                <div>
                    <label><b>Search</b></label>
                    <input style={{ width: "200px", marginTop:"10px"}}
                           type="text"
                           placeholder="Enter gift voucher code"
                           label="Search"
                           onChange={(e) => {
                               this.setState({
                                  searchGiftVoucherCode: e.target.value
                               });
                           }}
                    />
                </div>

                <h3 align="center">Gift Voucher Management</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Gift Voucher Name</th>
                        <th>Gift Voucher Code</th>
                        <th>Gift Voucher Price</th>
                        <th>Gift Voucher Release Date</th>
                        <th>Gift Voucher Expire Date</th>
                        <th>Gift Voucher is Issued/Not</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.tabRow() }
                    { this.state.searchGiftVoucherCode == "" ? this.tabRow2() : this.searchGiftVoucherList() }
                    </tbody>
                </table>

                <button className="btn btn-success float-right" onClick={this.exportGiftVouchersPDF}>Report</button>
            </div>
        );
    }
}