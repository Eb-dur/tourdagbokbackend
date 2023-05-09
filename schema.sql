

CREATE TABLE IF NOT EXISTS entries(
    --UserToken int NOT NULL UNIQUE,
    namn TEXT NOT NULL,
    text TEXT NOT NULL,
    date TEXT NOT NULL,
    id TEXT NOT NULL,
    PRIMARY KEY (id)
);
