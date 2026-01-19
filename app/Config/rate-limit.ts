export const rateLimit = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300,               // 300 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
};