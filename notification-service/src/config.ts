import dotenv from 'dotenv';

dotenv.config({});

class Config {
    public NODE_ENV: string | undefined;
    public CLIENT_URL: string | undefined;
    public RABITMQ_ENDPOINT: string | undefined;
    public SENDER_EMAIL: string | undefined;
    public SENDER_EMAIL_PASSWORD: string | undefined;
    public ELASTIC_SEARCH_URL: string | undefined;
    public ELASTIC_SEARCH_USERNAME: string | undefined;
    public ELASTIC_SEARCH_PASSWORD: string | undefined;

    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.RABITMQ_ENDPOINT = process.env.RABITMQ_ENDPOINT || '';
        this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
        this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
        this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
        this.ELASTIC_SEARCH_USERNAME = process.env.ELASTIC_SEARCH_USERNAME || '';
        this.ELASTIC_SEARCH_PASSWORD = process.env.ELASTIC_SEARCH_PASSWORD || '';
    }
}

export const config: Config = new Config();
