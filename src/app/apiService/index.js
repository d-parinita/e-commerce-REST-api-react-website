import axios from "axios"
import { apiConstants } from "../utils/apiConstants"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ecommerceApi = axios.create({
    baseURL: API_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

ecommerceApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") 
    if (token) {
        config.headers.Authorization = token
    }
    return config
    }, (error) => Promise.reject(error)
)

ecommerceApi.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if(error.response?.status === 401) {
            localStorage.clear();
            window.location.href = "/signIn"
        }
        return Promise.reject(error)
    }
)

export const signUp = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.SIGNUP, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const updateUser = async(payload) => {
    const user = JSON.parse(localStorage.getItem('user'))
    try {
        const data = await ecommerceApi.post(apiConstants.UPDATEUSER + '/' + user.id, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const signIn = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.SIGNIN, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const signOut = async() => {
    try {
        const data = await ecommerceApi.get(apiConstants.SIGNOUT)
        return data
    } catch (error) {
        throw error
    }
} 

export const userProfile = async() => {
    const user = JSON.parse(localStorage.getItem('user'))
    try {
        const data = await ecommerceApi.get(apiConstants.USERPROFILE + '/' + user.id)
        return data
    } catch (error) {
        throw error
    }
} 

export const getCategories = async() => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETCATEGORY)
        return data
    } catch (error) {
        throw error
    }
}

export const getAllProducts = async(pageNumber) => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETPRODUCT + `?pageNumber=${pageNumber}`)
        return data
    } catch (error) {
        throw error
    }
}

export const getProducts = async(limit) => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETPRODUCT + `?limit=${limit}`)
        return data
    } catch (error) {
        throw error
    }
}

export const getProductById = async(id) => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETPRODUCTBYID + '/' + id)
        return data
    } catch (error) {
        throw error
    }
}

export const addToCart = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.ADDTOCART, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const getCart = async() => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETCART)
        return data
    } catch (error) {
        throw error
    }
}

export const removeProduct = async(id) => {
    try {
        const data = await ecommerceApi.delete(apiConstants.REMOVEPRODUCT + id)
        return data
    } catch (error) {
        throw error
    }
}

export const codPlaceOrder = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.CODPLACEORDER, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const getOrders = async() => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETORDERS)
        return data
    } catch (error) {
        throw error
    }
}

export const cancel = async(id, payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.CANCELORDER + id, payload)
        return data
    } catch (error) {
        throw error
    }
}

export const createOrder = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.CREATEORDER, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const testValidatePayment = async(payload) => {
    try {
        const data = await ecommerceApi.post(apiConstants.TESTVALIDATEPAYMENT, payload)
        return data
    } catch (error) {
        throw error
    }
} 

export const getProductsByCategory = async(id) => {
    try {
        const data = await ecommerceApi.get(apiConstants.GETPRODUCT + `?category=${id}`)
        return data
    } catch (error) {
        throw error
    }
}