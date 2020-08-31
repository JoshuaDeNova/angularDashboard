export class FixedAssets {
    constructor(
        public fixedAssetsId: number,
        public name: string,
        public type: string,
        public description: string,
        public assetsPrice: number,
        public userId: number
    ) {
    }
}