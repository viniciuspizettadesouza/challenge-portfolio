export type EventData = {
    id: string;
    name: string;
    slug: string;
    category: string;
    status: string;
    has_live: boolean;
    starts_at: string;
    ends_at: string;
    location: {
        is_unknown: boolean;
        country: string;
        administration_area_level_1: string | null;
        administration_area_level_2: string | null;
        location: string;
        address: string | null;
        name: string;
        zip_code: string | null;
        latitude: number | null;
        longitude: number | null;
    };
    theme: {
        logo_image: string | null;
        background_image: {
            url: string;
            mime_type: string;
        };
        accent_colour: string;
    };
    price_range: {
        minimum: {
            amount: number;
            currency: string;
        };
        maximum: {
            amount: number;
            currency: string;
        };
    };
};
