/**
 * @swagger
 * /api/clinics/{clinicId}/appointments:
 *   get:
 *     summary: Retrieves appointments for a clinic
 *     tags:
 *       - Appointments
 *     parameters:
 *       - name: clinicId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the clinic to retrieve appointments for
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Appointments retrieved successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Clinic not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clinic not found."
 *       500:
 *         description: Internal server error while retrieving appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error retrieving appointments."
 */


/**
 * @swagger
 * /api/clinics/{clinicId}/appointments:
 *   post:
 *     summary: Creates a new appointment
 *     tags:
 *       - Appointments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clinicId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the clinic where the appointment will be scheduled
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appointment'
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet 123 appointment scheduled at clinic ABC successfully!"
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Invalid data or unavailable time slot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Time slot unavailable for appointment."
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not authenticated."
 *       403:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token."
 *       404:
 *         description: User not found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found!"
 *       500:
 *         description: Internal server error while creating appointment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating appointment."
 *                 error:
 *                   type: string
 *                   example: "Unknown error occurred."
 */