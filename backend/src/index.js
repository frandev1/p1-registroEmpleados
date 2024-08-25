import app from "./app"
import './database/connection'

app.listen(app.get('port'));