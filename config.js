const developmentConfig = {
    API_URL: 'http://localhost:8000',
    DEBUG_MODE: true,
  };
  
  const stagingConfig = {
    API_URL: 'https://staging.example.com/api',
    DEBUG_MODE: true,
  };
  
  const productionConfig = {
    API_URL: 'https://example.com/api',
    DEBUG_MODE: false,
  };
  
  const getConfig = (env) => {
    switch (env) {
      case 'development':
        return developmentConfig;
      case 'staging':
        return stagingConfig;
      case 'production':
        return productionConfig;
      default:
        throw new Error(`Invalid environment: ${env}`);
    }
  };

const config = getConfig(process.env.NODE_ENV || 'development');

export default config;
  