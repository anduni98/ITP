import React, { Component } from 'react'
import Products from './section/Products'
import Details from './section/Details'
import itemLists from './section/itemLists'
import EmptyCart from "./section/EmptyCart";
import {Route} from "react-router-dom"

export class Section extends Component{
   render() {
       return (
           <section>
               <Route path="/product" component={Products} exact />
               <Route path="/product/:id" component={Details} />
               <Route path="/itemLists" component={itemLists} exact />
               <Route path="/EmptyCart" component={EmptyCart} exact />
           </section>
       )
   }
}
export default Section