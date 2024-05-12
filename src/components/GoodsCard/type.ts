
interface goodItemProps {
    id: string,
    title:  string,
    imgUrl: string,
    price: number
}

interface cateItemProps {
    category: string,
    id: string,
    list: goodItemProps[],
    cover: string
}

export type propsType = {
    cateItem: cateItemProps
} 