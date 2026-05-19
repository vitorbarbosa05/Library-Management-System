export function healthHandler(request, response) {
    response.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
    });
}