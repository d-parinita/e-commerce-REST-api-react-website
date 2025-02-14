export const ORDER_STATUS = {
    CANCELLED: "Cancelled", 
    DELIVERED: "Delivered", 
    SHIPPED: "Shipped", 
    PROCESSING: "Processing", 
    RECEIVED: "Received"
}

export const FILTER_BY_SIZE = [
    {size: 'Filter By Size', selected: true},
    {size: 'XS', selected: false},
    {size: 'S', selected: false},
    {size: 'M', selected: false},
    {size: 'L', selected: false},
    {size: 'XL', selected: false},
    {size: 'XXL', selected: false}
]

export const FILTER_BY_PRICE = [
    {label: 'Filter By Price', selected: true},
    {minPrice: 1, maxPrice: 100, label: 'Under Rs.100', selected: false},
    {minPrice: 100, maxPrice: 500, label: 'Rs.100 - Rs.500', selected: false},
    {minPrice: 500, maxPrice: 1000000, label: 'Above Rs.500', selected: false},
]