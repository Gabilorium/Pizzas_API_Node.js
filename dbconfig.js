import "dotenv/config"

const config = {
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    server      : process.env.DB_SERVER,
    //server      : process.env.DB_SERVER_HOME,
    database    : process.env.DB_DATABASE,
    options     :{
        trustServerCertificate  :true,
        trustedConection        :true,
    }
}

export default config