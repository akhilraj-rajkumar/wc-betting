export class VenueModel {
    name: string;
    city: string;
    id: number;

    deserialize(input): VenueModel {
        this.name = input.venue_name;
        this.city = input.city;
        this.id = input.id;
        return this;
    }
}