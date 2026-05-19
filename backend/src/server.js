import app from "./app.js";
import {logger} from "./shared/logger/logger.js";

const port = 3000;

app.listen(port, () => {
    logger.info(`Server running on http://localhost:${port}`);
});