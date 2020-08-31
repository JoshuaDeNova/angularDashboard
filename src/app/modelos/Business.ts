export class Business {
    constructor(
        public businessId: number,
        public name: string,
        public address: string,
        public activity: string,
        public description: string,
        public userId: number
    ) {
    }
}