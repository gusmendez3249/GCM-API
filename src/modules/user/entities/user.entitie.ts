export class User {
    id: number;
    name: string;
    lastname: string;
    username: string;
    password?: string ;
    refreshToken?: string; 
    created_at: Date;
}