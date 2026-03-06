

USE gids6082;

CREATE TABLE IF NOT EXISTS users(
    id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (150) NOT NULL,
    lastname VARCHAR(400)
);

CREATE TABLE IF NOT EXISTS tasks(
    id SMALLINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    priority BOOLEAN,
    user_id SMALLINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);



INSERT INTO users (name, lastname) values('Gustavo','Méndez');
INSERT INTO users (name, lastname) values('Ángel','Cruz');

INSERT INTO tasks (name, description, priority, user_id) values('Task of Gus','Description',true,1);
INSERT INTO tasks (name, description, priority, user_id) values('Task of Gus','Description',true,2);


