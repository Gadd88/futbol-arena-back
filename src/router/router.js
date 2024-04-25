import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import productController from "../controllers/productController.js";
import reservationController from "../controllers/reservationController.js";
import canchasController from "../controllers/canchasController.js";
const router = express.Router();

// USUARIOS*****
//obtener usuarios
router.get("/users", usersControllers.obtenerUsuarios);
router.get("/users/:user_id", usersControllers.obtenerUnicoUsuario);

//registro usuario
router.post("/registro", usersControllers.registroUsuario);

//login usuario
router.post("/login", usersControllers.loginUser);

//editar usuario
router.put("/users/:user_id", usersControllers.actualizarUsuario);

//delete usuario
router.delete("/users/:user_id", usersControllers.eliminarUsuario);

//PRODUCTOS******
//obtener productos
router.get("/products", productController.obtenerProductos);

//obtener un producto
router.get("/products/:id", productController.obtenerUnicoProducto);

//agregar producto
router.post("/products", productController.agregarProducto);

//eliminar producto
router.delete("/products/:producto_id", productController.eliminarProducto);

//editar producto
router.patch("/products/:producto_id", productController.actualizarProducto);

//RESERVAS*****
// obtener lista de reservas
router.get("/reservations", reservationController.getReservations);

// obtener una reserva
router.get(
  "/reservations/:reserva_id",
  reservationController.getOneReservation
);

// reservar una cancha
router.post("/reservations", reservationController.addReservation);

// eliminar una reserva
router.delete(
  "/reservations/:reservation_id",
  reservationController.deleteReservation
);

//CANCHAS*****
// lista de canchas del predio
router.get("/canchas/lista", canchasController.getCanchasLista);

//lista de canchas con turnos para reservas
router.get("/canchas", canchasController.getCanchas);

//agregar cancha
router.post("/canchas", canchasController.addCancha);

//eliminar cancha
router.delete("/canchas/:cancha_id", canchasController.deleteCancha);

//swagger

// swagger for users
/** 
*@swagger
*components:
*    schemas:
*        User:
*            type: object
*            properties:
*                nombre:
*                    type: string
*                    example: Joaquin Reyes
*                email:
*                    type: string 
*                    example: joacooreyes@gmail.com  
*                telefono:
*                    type: string 
*                    example: 3816655544
*            required:
*                -nombre
*                -email
*                -telefono
*        Products:
*            type: object
*            require:
*                -producto
*                -detalle
*                -precio
*                -imagen
*                -categoria
*            properties:
*                producto:
*                    type: string
*                    example: Remera River Plate Adidas
*                    description:
*                detalle:
*                    type: string
*                    example: Remera Slim fit for football
*                    description: 
*                precio:
*                    type: string
*                    example: 70000
*                    description: 
*                imagen:
*                    type: string
*                    example : "link:url"
*                    description: 
*                categoria:
*                    type: string
*                    example: Indumentaria
*                    description:
*/

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   get:
 *     summary: List of all Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                  $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *             type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Get user by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: New user created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/{id}:
 *   patch:
 *     summary: update user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *       404:
 *         description: The user was not found
 */

/**
 *  @swagger
 *  tags:
 *    name: Users
 *    description: The users managing API
 *  /users/{id}:
 *    patch:
 *        summary: Update the user by id
 *        tags: [Users]
 *        parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: string
 *              required: true
 *              description: the user id
 *        requestBody:
 *            required: true
 *            content:
 *                application/json
 *                    schema:
 *                        $ref: '#/componentes/schemas/User'
 *        responses:
 *            200:
 *                description: the user was updated
 *                    content:
 *                        application/json
 *                            schema:
 *                                $ref: '#/componentes/schemas/User'
 *            404:
 *                description: the user was not found
 */

// swagger for products


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: New product created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /products:
 *   get:
 *     summary: List all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: $ref: '#/components/schemas/Products'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The product managing API
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
*          - in: path
*            name: id
*            schema:
*              type: string
*            required: true
*            description: The product ID
 *     responses:
 *       200:
 *         description: Get product by ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Products'
 *       404:
 *         description: product not found
 *
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

/**
 * @swagger
 * tags:
 *   name: products
 *   description: The products managing API
 * /Products/{id}:
 *   patch:
 *     summary: Update the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Productss'
 *     responses:
 *       200:
 *         description: The product was update
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Productss'
 *       404:
 *         description: The product was not found
 */

export default router;
