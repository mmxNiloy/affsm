const DB_Credentials = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    ssl: {"rejectUnauthorized":true}
}

export default DB_Credentials