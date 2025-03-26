-- t_permissions
CREATE TABLE dbo.t_permissions (
    permission_id INT IDENTITY(1,1) NOT NULL,
    permission_name NVARCHAR(50) NOT NULL,
    PRIMARY KEY (permission_id),
);

-- t_users
CREATE TABLE dbo.t_users (
    user_id INT IDENTITY(1,1) NOT NULL,
    username NVARCHAR(128) NOT NULL UNIQUE,
    password NVARCHAR(1024) NOT NULL,
    age INT NOT NULL,
    name NVARCHAR(128) NOT NULL,
    address NVARCHAR(128) NOT NULL,
    PRIMARY KEY (user_id),
);

-- t_sessions
CREATE TABLE dbo.t_sessions (
    session_id INT IDENTITY(1,1) NOT NULL,
    user_id INT NOT NULL,
    token NVARCHAR(128) NOT NULL,
    valid_until DATETIME2(3) NOT NULL DEFAULT DATEADD(HOUR, 1, SYSUTCDATETIME()),
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES dbo.t_users(user_id),
);

-- t_user_permissions
CREATE TABLE dbo.t_user_has_permissions (
    permission_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (permission_id, user_id),  
    FOREIGN KEY (permission_id) REFERENCES dbo.t_permissions(permission_id),
    FOREIGN KEY (user_id) REFERENCES dbo.t_users(user_id)
);

-- INSERTING DATA

INSERT INTO dbo.t_permissions (permission_name) 
VALUES ('users_view'), ('users_admin');


INSERT INTO dbo.t_users (username, password, age, name, address) 
VALUES 
    ('johndoe', '$2b$10$6hmIP5zEUXlNcKwaXh3GauZ.dW2It9kEa1TxXVUdj.vLZD07J4Yvu', 30, 'John Doe', '123 Main St'),
    ('janedoe', '$2b$10$Gg4c1ng5oaSDgUcUoG30buI44XCNdBnxZ1ybCVKfAnYtjJbimTJMK', 25, 'Jane Doe', '456 Side Ave');

INSERT INTO dbo.t_user_has_permissions (permission_id, user_id) 
VALUES 
    (1, 1),  
    (2, 1),  
    (1, 2);  
