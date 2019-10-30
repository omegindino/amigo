export class Profile {
    name: string;
    age: number;
    location: string;
    imageUrl: string;
    constructor(name: string, age: number, location: string, imageUrl: string) {
        this.name = name;
        this.age = age;
        this.location = location;
        this.imageUrl = imageUrl;
    }
}
