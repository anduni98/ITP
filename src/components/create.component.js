import React, { Component } from 'react';
import axios from 'axios';


export default class Create extends Component {

    constructor(props) {
        super(props);
        this.onChangeGiftVoucherName = this.onChangeGiftVoucherName.bind(this);
        this.onChangeGiftVoucherCode = this.onChangeGiftVoucherCode.bind(this);
        this.onChangeGiftVoucherPrice = this.onChangeGiftVoucherPrice.bind(this);
        this.onChangeGiftVoucherReleaseDate = this.onChangeGiftVoucherReleaseDate.bind(this);
        this.onChangeGiftVoucherExpireDate = this.onChangeGiftVoucherExpireDate.bind(this);
        this.onChangeGiftVoucherIssuedOrNot = this.onChangeGiftVoucherIssuedOrNot.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            gift_voucher_name: '',
            gift_voucher_code: '',
            gift_voucher_price:'',
            gift_voucher_release_date:'',
            gift_voucher_expire_date:'',
            gift_voucher_issue_or_not:'',

            giftVoucherNameError: "",
            giftVoucherCodeError: "",
            giftVoucherPriceError: "",
            giftVoucherReleaseDateError:"",
            giftVoucherExpireDateError: "",
            giftVoucherIssuedOrNotError: ""




        }
    }

    onChangeGiftVoucherName(e) {
        this.setState({
            gift_voucher_name: e.target.value
        });
    }
    onChangeGiftVoucherCode(e) {
        this.setState({
            gift_voucher_code: e.target.value
        })
    }
    onChangeGiftVoucherPrice(e) {
        this.setState({
            gift_voucher_price: e.target.value
        })
    }
    onChangeGiftVoucherReleaseDate(e) {
        this.setState({
            gift_voucher_release_date: e.target.value
        });
    }
    onChangeGiftVoucherExpireDate(e) {
        this.setState({
            gift_voucher_expire_date: e.target.value
        })
    }
    onChangeGiftVoucherIssuedOrNot(e) {
        this.setState({
            gift_voucher_issue_or_not: e.target.value
        })
    }



    validate = () => {
        let isError = false;

        const errors = {
            giftVoucherNameError: "",
            giftVoucherCodeError: "",
            giftVoucherPriceError: "",
            giftVoucherReleaseDateError:"",
            giftVoucherExpireDateError: "",
            giftVoucherIssuedOrNotError: ""

        };

        if (this.state.gift_voucher_name.length < 2) {
            isError = true;
            errors.giftVoucherNameError = "gift voucher name needs to be at least 3 characters long";
        }

        if (this.state.gift_voucher_code.length < 3) {
            isError = true;
            errors.giftVoucherCodeError = "gift voucher code needs to be at least 4 characters long";
        }

        if (this.state.gift_voucher_price < 500) {
            isError = true;
            errors.giftVoucherPriceError = "gift voucher price should be greater than Rs.500";
        }
        if (this.state.gift_voucher_issue_or_not.length < 1) {
            isError = true;
            errors.giftVoucherIssuedOrNotError = "gift voucher state is required";
        }

        this.setState({
            ...this.state,
            ...errors
        });

        return isError;
    };




    onSubmit(e) {
        e.preventDefault();

        const err = this.validate();
        if (!err) {

            const obj = {
                gift_voucher_name: this.state.gift_voucher_name,
                gift_voucher_code: this.state.gift_voucher_code,
                gift_voucher_price: this.state.gift_voucher_price,
                gift_voucher_release_date: this.state.gift_voucher_release_date,
                gift_voucher_expire_date: this.state.gift_voucher_expire_date,
                gift_voucher_issue_or_not: this.state.gift_voucher_issue_or_not

            };
            axios.post('http://localhost:4000/business/add', obj)
                .then(res => console.log(res.data));

            this.setState({
                gift_voucher_name: '',
                gift_voucher_code: '',
                gift_voucher_price: '',
                gift_voucher_release_date: '',
                gift_voucher_expire_date: '',
                gift_voucher_issue_or_not: ''
            })
        }
    }



    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add Gift Vouchers</h3>
                <form>
                    <div className="form-group">
                        <label>Add Gift Voucher Name:  </label>
                        <input type="text" className="form-control" value={this.state.gift_voucher_name} onChange={this.onChangeGiftVoucherName}/>
                        {this.state.giftVoucherNameError}
                    </div>
                    <div className="form-group">
                        <label>Add Gift Voucher Code: </label>
                        <input type="text" className="form-control" value={this.state.gift_voucher_code} onChange={this.onChangeGiftVoucherCode}/>
                        {this.state.giftVoucherCodeError}
                    </div>
                    <div className="form-group">
                        <label>Add Gift Voucher Price: </label>
                        <input type="text" className="form-control" value={this.state.gift_voucher_price} onChange={this.onChangeGiftVoucherPrice}/>
                        {this.state.giftVoucherPriceError}
                    </div>
                    <div className="form-group">
                        <label>Gift Voucher Release Date: </label>
                        <input type="date"  className="form-control" value={this.state.gift_voucher_release_date} onChange={this.onChangeGiftVoucherReleaseDate}/>
                    </div>
                    <div className="form-group">
                        <label>Gift Voucher Expire Date: </label>
                        <input type="date" className="form-control" value={this.state.gift_voucher_expire_date} onChange={this.onChangeGiftVoucherExpireDate}/>
                    </div>
                    <div className="form-group">
                        <label>Gift Voucher Issued/Not issued: </label>
                        <input type="text" className="form-control" value={this.state.gift_voucher_issue_or_not} onChange={this.onChangeGiftVoucherIssuedOrNot}/>
                        {this.state.giftVoucherIssuedOrNotError}
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save Details" className="btn btn-primary" onClick={this.onSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}
