import React, { Component } from 'react'



export const DataContext = React.createContext();

export class DataProvider extends  Component{

    state = {
        products: [
            {
                "_id": "1",
                "title": "Gift Voucher 01",
                "src": "https://i.pinimg.com/originals/78/23/7e/78237e1625341cc648bdf8dfac866916.jpg",
                "Description": "Gift certificate code - GCC0001",
                "Context": "Gift Voucher - For jewelries",
                "price": 5000.00,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Gift Voucher 02",
                "src": "https://i.etsystatic.com/12049225/r/il/e831e7/1000707923/il_570xN.1000707923_gcy2.jpg",
                "Description": "Gift certificate code - GCC0002",
                "Context": "Gift Voucher - For jewelries",
                "price": 10000.00,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Gift Voucher 03",
                "src": "https://i.pinimg.com/originals/fe/a4/a0/fea4a0d60a1a83b7897565bdb6307934.jpg",
                "Description": "Gift certificate code - GCC0003",
                "Context": "Gift Voucher - For jewelries",
                "price": 1000.00,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Gift Voucher 04",
                "src": "https://i.pinimg.com/originals/bb/de/8d/bbde8de0b8b986dcf55d12a87bd8f8c0.jpg",
                "Description": "Gift certificate code - GCC0004",
                "Context": "Gift Voucher - For jewelries",
                "price": 2000.00,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Gift Voucher 05",
                "src": "https://i.pinimg.com/originals/c5/69/f7/c569f770b09c83ae36e1f6555b59c520.jpg",
                "Description": "Gift certificate code - GCC0005",
                "Context": "Gift Voucher - For jewelries",
                "price": 7000.00,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Gift Voucher 06",
                "src": "https://i.pinimg.com/originals/c5/69/f7/c569f770b09c83ae36e1f6555b59c520.jpg",
                "Description": "Gift certificate code - GCC0006",
                "Context": "Gift Voucher - For jewelries",
                "price": 8000.00,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }

        ]
    }

    render() {
        const {products} = this.state;


        return (
            <DataContext.Provider value={{products}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}

