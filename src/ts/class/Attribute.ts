export class Attribute {
    property: string;
    value: string;

    constructor(property: string, value: string){
        this.property = property;
        this.value = value;
    }

    public getProperty(): string {
        return this.property;
    }

    public getValue(): string {
        return this.value;
    }
}