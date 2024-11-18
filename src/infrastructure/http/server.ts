import 'module-alias/register';
import { app } from '@/infrastructure/http/app';
import { config } from '@/infrastructure/config/config';

const port = config.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
