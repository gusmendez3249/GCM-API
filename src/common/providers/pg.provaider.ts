import{Client} from "pg"

export const pgProvider = [{
    provide: 'POSTGRES_CONNECTION',
    useFactory: async () => {
        const client = new Client({
            host:'localhost',
            port: 5432,
            user:'admin',
            password:'Compl1c@do',
            database:'gids6082'
        });

        await client.connect();

        return client;
    }
}]