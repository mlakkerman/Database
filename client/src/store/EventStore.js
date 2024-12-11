import { makeAutoObservable } from "mobx";
import { deleteEventFromAPI, fetchEvents } from "../http/eventAPI";
export default class EventStore {
    constructor() {
        this._organizations = []
        this._categories = []
        this._events = []
        this._selectedOrganization = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setOrganizations(organizations) {
        this._organizations = organizations
    }
    setCategories(categories) {
        this._categories = categories
    }
    setEvents(events) {
        this._events = events
    }
    deleteEvent = async (id) => {
        try {
            await deleteEventFromAPI(id);
            this._events = this._events.filter(event => event.id !== id);
            this._totalCount--;  // уменьшаем общее количество событий на 1
            if (this._events.length === 0 && this.page !== 1) {
                this.setPage(this.page - 1);
                await fetchEvents();
            }

        } catch (error) {
            console.log('Ошибка при удалении мероприятия: ', error);
        }
    };


    setSelectedOrganization(organization) {
        this.setPage(1)
        if (this._selectedOrganization === organization) {
            this._selectedOrganization = {}
        } else {
            this._selectedOrganization = organization
        }
    }
    setSelectedCategory(category) {
        this.setPage(1)
        if (this._selectedCategory === category) {
            this._selectedCategory = {}
        } else {
            this._selectedCategory = category
        }
    }
    resetSelectedEntities() {
        this._selectedOrganization = {};
        this._selectedCategory = {};
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get organizations() {
        return this._organizations
    }
    get categories() {
        return this._categories
    }
    get events() {
        return this._events
    }
    get selectedOrganization() {
        return this._selectedOrganization
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    
}
