
/**
 * This class provides a 2 way mapping between enum value and enum name.
 * It is useful when an enum is used in a dropdown. 
 */
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

    /**
     * Returns enum name for a given enum value
     * @param enumValue value of the enum
     */
    public getEnumName(enumValue: E): string {
        return this.map.get(enumValue);
    }

    /**
     * Returns enumValue for a given enum name.
     * @param enumName name of the enum
     */
    public getEnumValue(enumName: string): E {
        return this.enumType[enumName];
    }
}
