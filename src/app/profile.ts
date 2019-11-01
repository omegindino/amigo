export class Profile {
    name: string;
    age: number;
    location: string;
    description: string;
    imageUrl: string;
    constructor(name: string, age: number, location: string, description: string, imageUrl: string) {
        this.name = name;
        this.age = age;
        this.location = location;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
