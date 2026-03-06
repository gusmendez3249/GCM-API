import { createConnection } from 'mysql2/promise';

export const mysqlProvider = [
  {
    provide: 'MYSQL_CONNECTION',
    useFactory: async () => {
      const connection = await createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Compl1c@do',
        database: 'gids6082',
      });

      return connection;
    },
  },
];
