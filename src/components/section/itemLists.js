import React, { Component } from 'react';
import '../css/itemLists.css'
import Colors from "./Colors";
import {Link} from "react-router-dom";

export class Table extends Component{

    constructor(props) {
        super(props)
        this.state={
            cartItems:[],
            subTotal:0


        }

        //this.searchHandler = this.searchHandler.bind(this);
    }

    loadItemList(){
        var getCartItemsURl="http://localhost:3001/getCartItem?userName=";
        var userName="Kasun@gmail.com";
        getCartItemsURl+=userName;
        fetch(getCartItemsURl)
            .then(res =>{
                console.log(res);
                return res.json();
            })
            .then(response =>{
                console.log(response);
                var cartItemsArr=response.items;
                var discounts=response.discountDocs;
                var subTotal=0;
                var discountPercentage=0;
                var finalTotal=0;

                for(var i=0;i<cartItemsArr.length;i++) {
                    cartItemsArr[i]["totalPrice"] = cartItemsArr[i]["quantity"] * cartItemsArr[i]["unitPrice"];
                    subTotal+=cartItemsArr[i]["quantity"] * cartItemsArr[i]["unitPrice"];
                }

                for(var i=0;i<discounts.length;i++) {
                    if(subTotal>discounts[i].minPrice){
                        discountPercentage=discounts[i].discountPercentage;
                        finalTotal=subTotal-(subTotal*discounts[i].discountPercentage)/100;
                        break;
                    }
                }

                this.setState({cartItems:cartItemsArr,subTotal:subTotal,discountPercentage:discountPercentage,finalTotal:finalTotal})
            });
    }

    componentDidMount() {
        this.loadItemList();

    }

    removeCartItem(event,cartItem) {
        var itemId=cartItem.itemId;
        var userName=cartItem.userName;

        console.log("Remove cart item -"+JSON.stringify(cartItem));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId:itemId,userName:userName })
        };

        // POST request using fetch with error handling
        fetch('http://localhost:3001/deleteCartItem', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    console.log(error);
                }else{
                    this.loadItemList();
                    console.log(data);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    updateCartItem(event,cartItem) {
        var itemId=cartItem.itemId;
        var userName=cartItem.userName;
        var quantity=parseInt(cartItem.quantity);

        console.log("Update cart item -"+JSON.stringify(cartItem));

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId:itemId,userName:userName,quantity:quantity })
        };

        // POST request using fetch with error handling
        fetch('http://localhost:3001/updateCartItem', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    console.log(error);
                }else{
                    this.loadItemList();
                    console.log(data);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    handleChangeEvent(event,cartItem){
        console.log(event);
        console.log(cartItem);
        cartItem.quantity=event.target.value;
    }

    renderTableData(){

        return this.state.cartItems.map((cartItem,index)=>{
            const {itemId,Model,unitPrice,totalPrice,quantity,imageLink} = cartItem
            return (
                    <tr key={itemId}>

                        <td>{itemId}</td>
                        <td>{Model}</td>
                        <td>{unitPrice}</td>
                        <td>{totalPrice}</td>
                        <td><input id={itemId} type="text" onChange={e=>this.handleChangeEvent(e,cartItem)} defaultValue={quantity} /><input type="button" class="button" onClick={((e) => this.updateCartItem(e, cartItem))}value="Edit"/><input type="button" class="button" onClick={((e) => this.removeCartItem(e, cartItem))} value="Remove"/></td>
                        <td><img src={imageLink}/></td>

                    </tr>
            )

        })
    }

    // searchHandler(event){
    //     this.setState({})
    // }



    render() {
        return (
            <div className="list">
                <h2>Shopping Cart Items</h2>
                <table border={1} className="tbl">
                    <tbody>
                    <tr>

                        <th>ITEM ID</th>
                        <th>MODEL</th>
                        <th>UNIT PRICE(LKR)</th>
                        <th>TOTAL PRICE(LKR)</th>
                        <th>QUANTITY</th>
                        <th>IMAGE</th>

                    </tr>
                    {this.renderTableData()}

                    </tbody>

                </table>

                <br/><br/><br/>

                <div className="sub">
                    <table border={1}  className="tot">
                        <tr>
                            <td>Sub Total</td>
                            <td>{this.state.subTotal}</td>
                        </tr>
                    </table>
                    <br/>
                    <p>If your total is more than Rs.2000.00, a discount will be added.</p>
                    <table border={1} className="tot">
                        <tr>
                            <td>Discount</td>
                            <td>{this.state.discountPercentage}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{this.state.finalTotal}</td>
                        </tr>
                    </table>
                </div>

                <br/><br/>

                <h4>What would you like to do next?</h4>
                <p>Enter if you have a gift voucher code.</p>

                <input type="text" />

                <input type="button" class="bttn"  value="Apply"/>




                <br/><br/><br/><br/><br/>
                <input type="button" className="btton" value="CONTINUE SHOPPING"/>
                <input type="button" class="BTN"  value="CHECKOUT" />




            </div>
        )
    }
}
export default Table