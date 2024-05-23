export interface productListType {
    id: string,
    title: string,
    count: string,
    kilo: string,
    price: number,
    imgUrl: string,
    selected?: boolean
}

export interface cartListType {
    id: string,
    shopTitle: string,
    cartList : productListType[],
    selected?: boolean
}