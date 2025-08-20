/**
 * @swagger
 * /api/clinicas/:
 *   get:
 *     summary: Busca todas as clínicas cadastradas
 *     tags:
 *       - Clínicas
 *     responses:
 *       200:
 *         description: Clínicas encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clínicas encontradas com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Clinica'
 *       500:
 *         description: Erro interno ao buscar clínicas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erro interno ao buscar clínicas.
 */


/**
 * @swagger
 * /api/clinicas/clinicas-proximas:
 *   get:
 *     summary: Busca clínicas próximas ao usuário autenticado
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: radius
 *         in: query
 *         required: false
 *         schema:
 *           type: number
 *         description: Raio de busca em metros
 *     responses:
 *       200:
 *         description: Clínicas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clinica'
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
 *         description: Erro ao buscar clínicas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar clínicas."
 */


/**
 * @swagger
 * /api/clinicas/{id}/horarios:
 *   get:
 *     summary: Busca horários de atendimento de uma clínica
 *     tags:
 *       - Clínicas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica
 *     responses:
 *       200:
 *         description: Horários encontrados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Horários de atendimento encontrados com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Horarios'
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
 *         description: Erro ao buscar horários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar horários."
 */


/**
 * @swagger
 * /api/clinicas/{id}/vincular-profissional/{profissionalId}:
 *   post:
 *     summary: Vincula um profissional a uma clínica
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica
 *       - name: profissionalId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do profissional
 *     responses:
 *       201:
 *         description: Profissional vinculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profissional vinculado com sucesso à clínica."
 *                 vinculo:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Parametros são obrigatórios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ClinicaId e ProfissionalId são obrigatórios."
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
 *                   example: "Token inválido/expirado ou você não tem permissão para vincular profissional na clínica."
 *       404:
 *         description: Serviço ou Usuário não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Serviço ou Usuário não encontrado!"
 *       409:
 *         description: O profissional já está vinculado a esta clínica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "O profissional já está vinculado a esta clínica."
 *       500:
 *         description: Erro interno ao vincular profissional.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao vincular profissional."
 */


/**
 * @swagger
 * /api/clinicas/{id}/desvincular-profissional/{profissionalId}:
 *   delete:
 *     summary: Desvincula um profissional de uma clínica
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica
 *       - name: profissionalId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Profissional desvinculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profissional desvinculado com sucesso."
 *       400:
 *         description: Não é possível desvincular este profissional.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "A clínica precisa ter pelo menos um profissional vinculado. Não é possível desvincular este profissional."
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
 *                   example: "Token inválido/expirado ou você não tem permissão para deletar clínica."
 *       404:
 *         description: Profissional não vinculado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "O profissional não está vinculado a esta clínica."
 *       500:
 *         description: Erro interno ao desvincular profissional.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao desvincular profissional."
 */


/**
 * @swagger
 * /api/clinicas/:
 *   post:
 *     summary: Cria uma nova clínica
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinica'
 *     responses:
 *       201:
 *         description: Clínica criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clínica {clinica.nome} criada e associada ao usuário {user.nome} com sucesso!"
 *                 data:
 *                   $ref: '#/components/schemas/Clinica'
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
 *                   example: "Token inválido/expirado ou você não tem permissão para criar clínica."
 *       404:
 *         description: Usuário ou Endereço não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Usuário ou Endereço não encontrado. Por favor, revise os dados informados."
 *       408:
 *         description: Endereço não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "O serviço de geocodificação demorou muito para responder."
 *       500:
 *         description: Erro interno ao buscar coordenadas ou criar clínica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar clínica ou buscar coordenadas."
 */


/**
 * @swagger
 * /api/clinicas/{id}/horarios:
 *   post:
 *     summary: Adiciona horários de atendimento a uma clínica
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Horarios'
 *     responses:
 *       201:
 *         description: Horários adicionados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Horários de atendimento adicionados com sucesso!"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Horarios'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os horários devem ter dia, hora de início e hora de fim."
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
 *                   example: "Token inválido/expirado ou você não tem permissão para criar clínica."
 *       404:
 *         description: Clínica ou Usuário não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clínica ou Usuário não encontrado!"
 *       500:
 *         description: Erro interno ao adicionar horários.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao adicionar horários."
 */


/**
 * @swagger
 * /api/clinicas/{id}:
 *   delete:
 *     summary: Exclui uma clínica
 *     tags:
 *       - Clínicas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da clínica
 *     responses:
 *       200:
 *         description: Clínica deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Clínica {clinica.nome} deletada com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Clinica'
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
 *                   example: "Token inválido/expirado ou você não tem permissão para deletar clínica."
 *       404:
 *         description: Clínica ou Usuário não encontrado!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Clínica ou Usuário não encontrado!"
 *       500:
 *         description: Erro interno ao deletar clínica.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar clínica."
 */