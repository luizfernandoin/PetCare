/**
 * @swagger
 * /api/clinics/:
 *   get:
 *     summary: Get all registered clinics
 *     tags:
 *       - Clinics
 *     responses:
 *       200:
 *         description: Clinics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clinics retrieved successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Clinic'
 *       500:
 *         description: Internal error retrieving clinics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal error retrieving clinics.
 */


/**
 * @swagger
 * /api/clinics/nearby-clinics:
 *   get:
 *     summary: Get clinics near the authenticated user
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: radius
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *         description: Search radius in meters
 *     responses:
 *       200:
 *         description: Clinics found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clinic'
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
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found!"
 *       500:
 *         description: Error retrieving clinics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving clinics."
 */


/**
 * @swagger
 * /api/clinics/{id}/schedules:
 *   get:
 *     summary: Get clinic's service schedules
 *     tags:
 *       - Clinics
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     responses:
 *       200:
 *         description: Schedules retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service schedules retrieved successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedules'
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
 *         description: Error retrieving schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error retrieving schedules."
 */


/**
 * @swagger
 * /api/clinics/{id}/link-professional/{professionalId}:
 *   post:
 *     summary: Link a professional to a clinic
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *       - name: professionalId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Professional ID
 *     responses:
 *       201:
 *         description: Professional linked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professional successfully linked to the clinic."
 *                 link:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Required parameters missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ClinicId and ProfessionalId are required."
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
 *         description: Unauthorized action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid/expired token or you do not have permission to link a professional to the clinic."
 *       404:
 *         description: Service or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Service or User not found!"
 *       409:
 *         description: Professional already linked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The professional is already linked to this clinic."
 *       500:
 *         description: Internal error linking professional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error linking professional."
 */


/**
 * @swagger
 * /api/clinics/{id}/unlink-professional/{professionalId}:
 *   delete:
 *     summary: Unlink a professional from a clinic
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *       - name: professionalId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Professional ID
 *     responses:
 *       200:
 *         description: Professional unlinked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Professional unlinked successfully."
 *       400:
 *         description: Cannot unlink this professional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The clinic must have at least one professional linked. Cannot unlink this professional."
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
 *         description: Unauthorized action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid/expired token or you do not have permission to delete a clinic."
 *       404:
 *         description: Professional not linked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The professional is not linked to this clinic."
 *       500:
 *         description: Internal error unlinking professional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error unlinking professional."
 */


/**
 * @swagger
 * /api/clinics/:
 *   post:
 *     summary: Create a new clinic
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinic'
 *     responses:
 *       201:
 *         description: Clinic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clinic {clinic.name} created and associated with user {user.name} successfully!"
 *                 data:
 *                   $ref: '#/components/schemas/Clinic'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error."
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
 *         description: Unauthorized action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid/expired token or you do not have permission to create a clinic."
 *       404:
 *         description: User or Address not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User or Address not found. Please review the provided data."
 *       408:
 *         description: Address service timeout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "The geocoding service took too long to respond."
 *       500:
 *         description: Internal error creating clinic or retrieving coordinates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating clinic or retrieving coordinates."
 */


/**
 * @swagger
 * /api/clinics/{id}/schedules:
 *   post:
 *     summary: Add service schedules to a clinic
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Schedules'
 *     responses:
 *       201:
 *         description: Schedules added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Service schedules added successfully!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedules'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All schedules must have a day, start time, and end time."
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
 *         description: Unauthorized action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid/expired token or you do not have permission to create a clinic."
 *       404:
 *         description: Clinic or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clinic or User not found!"
 *       500:
 *         description: Internal error adding schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error adding schedules."
 */


/**
 * @swagger
 * /api/clinics/{id}:
 *   delete:
 *     summary: Delete a clinic
 *     tags:
 *       - Clinics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Clinic ID
 *     responses:
 *       200:
 *         description: Clinic deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clinic {clinic.name} deleted successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Clinic'
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
 *         description: Unauthorized action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid/expired token or you do not have permission to delete a clinic."
 *       404:
 *         description: Clinic or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clinic or User not found!"
 *       500:
 *         description: Internal error deleting clinic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error deleting clinic."
 */