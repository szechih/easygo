
interface goodItemProps {
    id: string,
    title:  string,
    imgUrl: string,
    price: number
}

export type propsType = {
    list: goodItemProps[],
} 