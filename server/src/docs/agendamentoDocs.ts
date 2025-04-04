/**
 * @swagger
 * /api/clinicas/{clinicaId}/agendamentos:
 *   get:
 *     summary: Busca os agendamentos de uma clínica
 *     tags:
 *       - Agendamentos
 *     parameters:
 *       - name: clinicaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica cujos agendamentos serão buscados
 *     responses:
 *       200:
 *         description: Agendamentos encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Agendamentos encontrados com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Clínica não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clínica não encontrada."
 *       500:
 *         description: Erro interno ao buscar agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar agendamentos."
 */


/**
 * @swagger
 * /api/clinicas/{clinicaId}/agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags:
 *       - Agendamentos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clinicaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica onde o agendamento será realizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Agendamento do pet 123 realizado na clínica ABC com sucesso!"
 *                 data:
 *                   $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Dados inválidos ou horário indisponível
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Horário indisponível para agendamento."
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário não autenticado."
 *       403:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido ou expirado."
 *       404:
 *         description: Usuário não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário não encontrado!"
 *       500:
 *         description: Erro interno ao criar agendamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar agendamento."
 *                 error:
 *                   type: string
 *                   example: "Erro desconhecido."
 */