import { $authHost, $host } from "./index";

export const createOrganization = async (name) => {
    const { data } = await $authHost.post('api/organization', name)
    return data
}

export const registerToEvent = async (eventId, userId) => {
    const { data } = await $authHost.post('api/registration', {eventId, userId})
    return data
};

export const getRegisteredEvents = async (userId) => {
    const { data } = await $authHost.get(`api/registration/${userId}`);
    return data;
};

export const checkRegistration = async (eventId, userId) => {
    const registeredEvents = await getRegisteredEvents(userId);
    return registeredEvents.some(event => event.id === eventId);
};

export const fetchOrganization = async (id) => {
    const { data } = await $host.get('api/organization/' + id)
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await $host.get('api/category/' + id)
    return data
}

export const fetchOrganizations = async () => {
    const { data } = await $host.get('api/organization')
    return data
}

export const createCategory = async (category) => {
    const { data } = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const { data } = await $host.get('api/category',)
    return data
}

export const createEvent = async (event) => {
    const { data } = await $authHost.post('api/event', event)
    return data
}

export const fetchEvents = async (categoryId, organizationId, page, limit = 5) => {
    const { data } = await $host.get('api/event', {
        params: {
            organizationId, categoryId, page, limit
        }
    })
    return data
}

export const fetchOneEvent = async (id) => {
    const { data } = await $host.get('api/event/' + id)
    return data
}

export const deleteEventFromAPI = async (id) => {
    const { data } = await $authHost.delete(`api/event/${id}`)
    return data
}
