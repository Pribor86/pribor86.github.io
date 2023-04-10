interface PortfolioItemI {
    id: string;
    name: string;
    description: string;
    images: string[];
    links: link[];
    tech: string[];
}

interface link {
    name: string;
    url: string;
    icon: string;
}

export default PortfolioItemI;