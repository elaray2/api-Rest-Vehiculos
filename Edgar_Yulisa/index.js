import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './db.js'
import VehiculosRoutes from './routes/vehiculoRoutes.js'
import authRoutes  from'./routes/authRoutes.js';

const app = express();
const PORT =  process.env.PORT || 3000

//Middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.json({'message':'Bienvenidos a mi sitio web'})
});

//RUTAS:

app.use('/api/vehiculos', VehiculosRoutes);

app.use('/api/auth', authRoutes);

app.listen(PORT)
console.log("servidor abierto en el: http://localhost:"+ PORT)