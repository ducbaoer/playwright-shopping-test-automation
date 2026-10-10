export type ProductCategory =
    | 'Speakers'
    | 'Tablets'
    | 'Laptops'
    | 'Mice'
    | 'Headphones';

const PRODUCT_CATALOG: Record<string, ProductCategory> = {
    'BOSE SOUNDLINK BLUETOOTH SPEAKER III': 'Speakers',
    'BOSE SOUNDLINK WIRELESS SPEAKER': 'Speakers',
    'HP ROAR MINI WIRELESS SPEAKER': 'Speakers',
    'HP ROAR PLUS WIRELESS SPEAKER': 'Speakers',
    'HP ROAR WIRELESS SPEAKER': 'Speakers',
    'HP S9500 BLUETOOTH WIRELESS SPEAKER': 'Speakers',
    'LOGITECH X100 SPEAKER SYSTEM - WIRELESS SPEAKER(S)': 'Speakers',
    'HP ELITEPAD 1000 G2 TABLET': 'Tablets',
    'HP ELITE X2 1011 G1 TABLET': 'Tablets',
    'HP PRO TABLET 608 G1': 'Tablets',
    'HP CHROMEBOOK 14 G1(ENERGY STAR)': 'Laptops',
    'HP CHROMEBOOK 14 G1(ES)': 'Laptops',
    'HP ENVY - 17T TOUCH LAPTOP': 'Laptops',
    'HP ENVY X360 - 15T LAPTOP': 'Laptops',
    'HP PAVILION 15T TOUCH LAPTOP': 'Laptops',
    'HP PAVILION 15Z LAPTOP': 'Laptops',
    'HP PAVILION 15Z TOUCH LAPTOP': 'Laptops',
    'HP PAVILION X360 - 11T TOUCH LAPTOP': 'Laptops',
    'HP SPECTRE X360 - 13-4102DX': 'Laptops',
    'HP STREAM - 11-D020NR LAPTOP': 'Laptops',
    'HP ZBOOK 17 G2 MOBILE WORKSTATION': 'Laptops',
    'HP USB 3 BUTTON OPTICAL MOUSE': 'Mice',
    'HP Z3200 WIRELESS MOUSE': 'Mice',
    'HP Z3600 WIRELESS MOUSE': 'Mice',
    'HP Z4000 WIRELESS MOUSE': 'Mice',
    'HP Z8000 BLUETOOTH MOUSE': 'Mice',
    'KENSINGTON ORBIT 72337 TRACKBALL WITH SCROLL RING': 'Mice',
    'KENSINGTON ORBIT 72352 TRACKBALL': 'Mice',
    'LOGITECH G502 PROTEUS CORE': 'Mice',
    'MICROSOFT SCULPT TOUCH MOUSE': 'Mice',
    'BEATS STUDIO 2 OVER-EAR MATTE BLACK HEADPHONES': 'Headphones',
    'BOSE SOUNDLINK AROUND-EAR WIRELESS HEADPHONES II': 'Headphones',
    'HP H2310 IN-EAR HEADSET': 'Headphones',
    'LOGITECH USB HEADSET H390': 'Headphones',
};

export function getProductCategory(productName: string): ProductCategory {
    const category = PRODUCT_CATALOG[productName];

    if (!category) {
        throw new Error(
            `No category defined for product "${productName}"`
        );
    }

    return category;
}