/**
 * @swagger
 * /api/services/{serviceId}/review:
 *   post:
 *     summary: Cria uma nova review para um serviço
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço para o qual a review será criada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 $ref: '#/components/schemas/Review'
 *       400:
 *         description: Atributos obrigatórios faltando.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Nota e comentário são obrigatórios."
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
 *         description: Serviço não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Serviço não encontrado!"
 *       500:
 *         description: Erro interno ao criar review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar review."
 */


/**
 * @swagger
 * /api/services/{serviceId}/reviews:
 *   get:
 *     summary: Busca todas as reviews de um serviço
 *     tags:
 *       - Reviews
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço cujas reviews serão buscadas
 *     responses:
 *       200:
 *         description: Reviews encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reviews encontrados com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       404:
 *         description: Reviews não encontradas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nenhum review encontrado para este serviço."
 *       500:
 *         description: Erro interno ao buscar reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar reviews."
 */


/**
 * @swagger
 * /api/services/{serviceId}/reviews:
 *   delete:
 *     summary: Remove uma review de um serviço para o usuário autenticado
 *     tags:
 *       - Reviews
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: serviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço cuja review será removida
 *     responses:
 *       200:
 *         description: Review deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deletada com sucesso."
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
 *         description: Usuário não autenticado ou acessão negado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido/expirado ou você não tem permissão para deletar este review.."
 *       404:
 *         description: Usuário ou Review não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuário ou Review não encontrada."
 *       500:
 *         description: Erro interno ao deletar review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar review."
 */