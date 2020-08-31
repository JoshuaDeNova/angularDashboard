export class Worker {
    constructor(
        public workersId: number,
        public surname: string,
        public name: string,
        public email: string,
        public contractType: string,
        public workerPrice: number,
        public socialInsurance: number,
        public userId: number
    ) {
    }
}