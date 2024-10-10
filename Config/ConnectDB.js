const sql = require('mssql');

// Define your SQL Server configuration
const config = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,  // For localhost, you can use 'localhost'
  database: process.env.DATABASE,
  options: {
    encrypt: false,  // Use true if you're connecting to Azure SQL, false otherwise
    trustServerCertificate: true  // Set true for self-signed certificates
  }
};

// Connect to SQL Server and run a query
const connectToSqlServer = async () => {
  try {
    // Establish connection
    await sql.connect(config);
    await sql.query`
          IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[item]') AND type in (N'U'))
          BEGIN
              CREATE TABLE item (
                  id INT IDENTITY(1,1) PRIMARY KEY,        
                  caption NVARCHAR(50) NOT NULL,
                  userid NVARCHAR(50) NOT NULL,
                  date DATETIME NOT NULL DEFAULT GETDATE() 
              );
          END;`
    await sql.query`
          IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[subitem]') AND type in (N'U'))
          BEGIN
              CREATE TABLE subitem (
                  id INT IDENTITY(1,1) PRIMARY KEY,             
                  itemid INT NULL,                              
                  caption NVARCHAR(50) NOT NULL,  
                  userid NVARCHAR(50) NOT NULL,               
                  CONSTRAINT fk_item FOREIGN KEY (itemid) REFERENCES item(id) ON DELETE SET NULL, 
                  date DATETIME NOT NULL DEFAULT GETDATE()      
              );
          END;`
    await sql.query`
          IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[article]') AND type in (N'U'))
          BEGIN
              CREATE TABLE article (
                  id INT IDENTITY(1,1) PRIMARY KEY,              
                  subitemid INT NULL,                            
                  title NVARCHAR(50) NOT NULL,                    
                  description NVARCHAR(MAX) NULL,                         
                  code NVARCHAR(MAX) NULL,                                
                  image NVARCHAR(MAX) NULL,                               
                  [file] NVARCHAR(MAX) NULL, 
                  userid NVARCHAR(50) NOT NULL,                               
                  CONSTRAINT fk_subitem FOREIGN KEY (subitemid) REFERENCES subitem(id) ON DELETE SET NULL,  
                  date DATETIME NOT NULL DEFAULT GETDATE()       
              );
          END;`
    await sql.query`
          IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type in (N'U'))
          BEGIN
              CREATE TABLE users (
                  email NVARCHAR(50) PRIMARY KEY,              
                  password NVARCHAR(MAX) NOT NULL,                    
                  firstname NVARCHAR(50) NOT NULL,                    
                  lastname NVARCHAR(50) NOT NULL, 
                  isActivated INT NOT NULL,                   
                  date DATETIME NOT NULL DEFAULT GETDATE()       
              );
          END;`
  } catch (err) {
    console.error('SQL error', err.message);
  } finally {
    // Close the connection
    await sql.close();
  }
}

module.exports = {
  connectToSqlServer,
  config
}
