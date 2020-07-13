export class User{
    constructor(
        public name: string,
        public password: any
    ){}
}

export class NewUser{
    public id: number;
    public name: string;
    public email: string;
    public password: string;
}