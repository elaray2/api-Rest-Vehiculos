import { Router } from "express";
import * as vehiculoCtrl from '../controllers/vehiculoController.js';
import { verificarToken } from '../middleware/authToken.js';

const router = Router();

// Middleware de autenticación
router.use((req, res, next) => {
  const token = req.headers['authorization']; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const claveSecreta = 'clave-secreta'; // La misma clave secreta que utilizaste para firmar el token
  const esTokenValido = verificarToken(token, claveSecreta);

  if (!esTokenValido) {
    return res.status(401).json({ message: 'Token inválido o ha expirado.' });
  }

  // Si el token es válido, se permite el acceso a las rutas protegidas
  next();
});

// Rutas protegidas de vehículos
router.get('/', vehiculoCtrl.findAllVehiculos);
router.get('/:id', vehiculoCtrl.findOneVehiculo);
router.post('/', vehiculoCtrl.addVehiculo);
router.patch('/:id', vehiculoCtrl.updateVehiculo);
router.delete('/:id', vehiculoCtrl.deleteVehiculo);

export default router;

