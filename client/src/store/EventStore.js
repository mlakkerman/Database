import {makeAutoObservable} from "mobx";

export default class EventStore {
    constructor() {
        this._sponsors = []
        this._categories = []
        this._events = []
        this._selectedSponsor = {}
        this._selectedCategory = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
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

    setSelectedSponsor(sponsor) {
        this.setPage(1)
        this._selectedSponsor = sponsor
    }
    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
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
