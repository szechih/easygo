export interface productListType {
    id: string,
    title: string,
    count: string,
    kilo: string,
    price: number,
    imgUrl: string
}

export interface cartListType {
    id: string,
    shopTitle: string,
    cartList : productListType[]
}