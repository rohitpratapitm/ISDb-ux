
export class EnumSelector<E> {

    public keys: string[];
    private map: Map<E, string> = new Map<E, string>();
    private enumType: E;

    // tslint:disable-next-line:ban-types
    constructor(enumType: Object) {
        this.enumType = enumType as E;
        this.keys = Object.keys(enumType);
        this.keys = this.keys.filter((key) => isNaN(Number(key)));
        this.keys.forEach((key) => this.map.set(enumType[key], key));
    }

    public getEnumName(enumValue: E): string {
        return this.map.get(enumValue);
    }

    public getEnumValue(enumName: string): E {
        return this.enumType[enumName];
    }

    public count(): number {
        return this.keys.length;
    }
}
