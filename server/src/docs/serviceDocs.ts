/**
 * @swagger
 * /api/clinicas/{clinicaId}/services:
 *   get:
 *     summary: Busca todos os serviços de uma clínica
 *     tags:
 *       - Serviços
 *     parameters:
 *       - name: clinicaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica cujos serviços serão buscados
 *     responses:
 *       200:
 *         description: Serviços encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Serviços encontrados com sucesso."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Service'
 *       404:
 *         description: Clínica não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clínica não encontrada."
 *       500:
 *         description: Erro interno ao buscar serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar serviços."
 */


/**
 * @swagger
 * /api/clinicas/{clinicaId}/services:
 *   post:
 *     summary: Adiciona um novo serviço a uma clínica
 *     tags:
 *       - Serviços
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: clinicaId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica onde o serviço será criado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Serviço adicionado à clínica NomeClinica com sucesso!"
 *                 data:
 *                   $ref: '#/components/schemas/Service'
 *       400:
 *         description: Tipo do serviço é obrigatorio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tipo do serviço é obrigatorio."
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token não fornecido."
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
 *         description: Clinica não encontrada!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clinica não encontrada!"
 *       500:
 *         description: Erro interno ao criar serviço
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar serviço."
 */