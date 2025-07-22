/**
 * @swagger
 * /api/pets/:
 *   post:
 *     summary: Cria um novo pet para o usuário autenticado
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet criado com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro de validação."
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
 *         description: Erro interno ao criar pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro interno ao criar pet."
 */


/**
 * @swagger
 * /api/pets/:
 *   get:
 *     summary: Busca todos os pets cadastrados
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Pets encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pets encontrados com sucesso."
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Erro interno ao buscar pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar pets."
 */


/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Busca um pet pelo ID
 *     tags:
 *       - Pets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet a ser buscado
 *     responses:
 *       200:
 *         description: Pet encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet encontrado com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro de validação."
 *       404:
 *         description: Pet não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet não encontrado."
 *       500:
 *         description: Erro interno ao buscar pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar pet."
 *                 error:
 *                   type: string
 *                   example: "Erro desconhecido."
 */


/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Atualiza as informações de um pet
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetUpdate'
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet atualizado com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro de validação."
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
 *                   example: "Token inválido/expirado ou você não tem permissão para atualizar este review."
 *       404:
 *         description: Usuário ou Pet não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário ou Pet não encontrado!"
 *       500:
 *         description: Erro interno ao atualizar pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar pet."
 *                 error:
 *                   type: string
 *                   example: "Erro desconhecido."
 */


/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Remove um pet pelo ID
 *     tags:
 *       - Pets
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet a ser removido
 *     responses:
 *       200:
 *         description: Pet deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pet deletado com sucesso."
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
 *         description: Usuário ou Pet não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário ou Pet não encontrado!"
 *       500:
 *         description: Erro interno ao deletar pet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar pet."
 *                 error:
 *                   type: string
 *                   example: "Erro desconhecido."
 */