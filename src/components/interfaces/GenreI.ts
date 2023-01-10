interface GenreI {
    id: string;
    name: string;
    locale?: string;
    _links: Links
    _embedded?: Embedded;
}

interface Embedded {
    subgenres: Subgenre[];
}

interface Subgenre {
    id: string;
    name: string;
    locale: string;
    _links: Links;
}

interface Links {
    self: Self;
}

interface Self {
    href: string;
}

export default GenreI;