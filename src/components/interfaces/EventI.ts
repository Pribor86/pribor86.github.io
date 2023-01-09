interface EventI {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    images: Image[];
    sales: Sales;
    dates: Dates;
    classifications: Classification[];
    promoter: Promoter;
    promoters: Promoter[];
    priceRanges: PriceRange[];
    _links: Links;
    _embedded: Embedded;
}

interface Embedded {
    venues: Venue[];
    attractions: Attraction[];
}

interface Attraction {
    href?: string;
    name?: string;
    type?: string;
    id?: string;
    test?: boolean;
    url?: string;
    locale?: string;
    externalLinks?: ExternalLink;
    images?: Image[];
    classifications?: Classification[];
    upcomingEvents?: UpcomingEvents;
    _links?: Links;
}

interface Links {
    self: Self;
    attractions?: Attraction[];
    venues?: Venue[];
}

interface Self {
    href: string;
}

interface UpcomingEvents {
    _total: number;
    _filtered: number;
}

interface Classification {
    primary: boolean;
    segment: Segment;
    genre: Genre;
    subGenre: SubGenre;
    type: Type;
    subType: SubType;
    family: boolean;
}

interface SubType {
    id: string;
    name: string;
}

interface Type {
    id: string;
    name: string;
}
interface SubGenre {
    id: string;
    name: string;
}
interface Genre {
    id: string;
    name: string;
}
interface Segment {
    id: string;
    name: string;
}
interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
    attribution: string;
}
interface ExternalLink {
    youtube: Youtube[];
    twitter: Twitter[];
    itunes: Itunes[];
    facebook: Facebook[];
    instagram: Instagram[];
    homepage: Homepage[];
}
interface Homepage {
    url: string;
}
interface Instagram {
    url: string;
}
interface Facebook {
    url: string;
}
interface Itunes {
    url: string;
}
interface Twitter {
    url: string;
}
interface Youtube {
    url: string;
}
interface Venue {
    name: string;
    type: string;
    id: string;
    test: boolean;
    url: string;
    locale: string;
    postalCode: string;
    timezone: string;
    city: City;
    country: Country;
    address: Address;
    location: Location;
    upcomingEvents: UpcomingEvents;
    _links: Links;
}
interface Location {
    longitude: string;
    latitude: string;
}
interface Address {
    line1: string;
}
interface Country {
    name: string;
    countryCode: string;
}
interface City {
    name: string;
}
interface PriceRange {
    type: string;
    currency: string;
    min: number;
    max: number;
}
interface Promoter {
    id: string;
    name: string;
}
interface Classification {
    primary: boolean;
    segment: Segment;
    genre: Genre;
    subGenre: SubGenre;
    family: boolean;
}
interface Dates {
    start: Start;
    timezone: string;
    status: Status;
    spanMultipleDays: boolean;
}
interface Status {
    code: string;
}
interface Start {
    localDate: string;
    localTime: string;
    dateTime: string;
    dateTBD: boolean;
    dateTBA: boolean;
    timeTBA: boolean;
    noSpecificTime: boolean;
}
interface Sales {
    public: Public;
}
interface Public {
    startDateTime: string;
    startTBD: boolean;
    startTBA: boolean;
    endDateTime: Date;
}
interface Image {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
}

export default EventI;