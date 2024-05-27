import { makeAutoObservable } from "mobx";
import { deleteEventFromAPI } from "../http/eventAPI";
import { fetchEvents } from "../http/eventAPI";
export default class EventStore {
    constructor() {
        this._sponsors = []
        this._categories = []
        this._events = []
        this._selectedSponsor = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this)
    }

    setSponsors(sponsors) {
        this._sponsors = sponsors
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


    setSelectedSponsor(sponsor) {
        this.setPage(1)
        if (this._selectedSponsor === sponsor) {
            this._selectedSponsor = {}
        } else {
            this._selectedSponsor = sponsor
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
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get sponsors() {
        return this._sponsors
    }
    get categories() {
        return this._categories
    }
    get events() {
        return this._events
    }
    get selectedSponsor() {
        return this._selectedSponsor
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
