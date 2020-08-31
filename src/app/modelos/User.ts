export class User {
    constructor(
        public userId: number,
        public name: string,
        public surname: string,
        public address: string,
        public docType: boolean,
        public email: string,
        public password: string,
        public registerDate: any
    ) {
    }
}