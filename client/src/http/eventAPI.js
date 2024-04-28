import {$authHost, $host} from "./index";

export const createType = async (name) => {
    const {data} = await $authHost.post('api/sponsor', name)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/sponsor')
    return data
}

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category', )
    return data
}

export const createEvent = async (event) => {
    const {data} = await $authHost.post('api/event', event)
    return data
}

export const fetchEvents = async (categoryId, sponsorId, page, limit= 5) => {
    const {data} = await $host.get('api/event', {params: {
            categoryId, sponsorId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/event/' + id)
    return data
}
