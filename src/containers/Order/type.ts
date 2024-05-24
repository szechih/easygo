interface productType {
    id: string,
    imgUrl: string,
    kilo: string,
    title: string,
    price: number,
    count: number
}

interface shopType {
    id: string,
    shopTitle: string,
    cartList: productType[]
}

export interface dataType {
    information: {
        id: string,
        name: string,
        phone: string,
        address: string,
    },
    time: string,
    total: string,
    list: shopType[]
}

export interface addressType {
    id: string,
    name: string,
    address: string,
    phone: string
}