export const authMiddleware = async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Authorization header missing' });
      }
  
      const apiKey = req.headers.authorization.replace('Bearer', '').trim();
      console.log('api key given is: ', apiKey);  
      
      if (!apiKey) {
        return res.status(401).json({ error: 'Not authorised for this operation' });
      }
  
      req.user = apiKey;
  
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };