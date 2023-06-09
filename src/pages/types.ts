
export interface ICardData {

    _id: number,
    title: string,
    subTitle: string,
    address: string,
    phone: string,
    bizNumber: string,
    image: {
        url: string,
        alt: string
    },
    category: Categories;
};

export enum Categories {
    all = "all",
    vegeterian = "Craem face",
    asian = 'Cream body',
    chicken = "Cream hand",
    Cat = 'Craem foots'
}