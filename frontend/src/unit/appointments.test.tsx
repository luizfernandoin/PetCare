import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActionsTable } from '@/components/molecules/table/actions-table';
import { vi, describe, test, expect } from 'vitest';

describe('ActionsTable', () => {
    const mockItem = {
        id: "1",
        tutor: "Carlos Silva",
        pet: "Rex",
        servico: "Banho",
        clinica: "Pet Vida",
        status: "pendente",
        data: "2025-07-15",
        horarioInicio: "14:00",
        horarioFim: "15:00",
    };

    const openMenu = async () => {
        const trigger = screen.getByRole('button', { name: /abrir menu/i });
        await userEvent.click(trigger);
    };

    test('abre o menu ao clicar no botão de trigger', async () => {
        render(
            <ActionsTable
                item={mockItem}
                getId={(item) => item.id}
                onEdit={() => { }}
                onDelete={() => { }}
            />
        );

        expect(screen.queryByText('Editar')).not.toBeInTheDocument();
        expect(screen.queryByText('Excluir')).not.toBeInTheDocument();

        await openMenu();

        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Excluir')).toBeInTheDocument();
    });

    test('renderiza botões de editar e excluir após abrir o menu', async () => {
        render(
            <ActionsTable
                item={mockItem}
                getId={(item) => item.id}
                onEdit={() => { }}
                onDelete={() => { }}
            />
        );

        await openMenu();

        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Excluir')).toBeInTheDocument();
    });

    test('executa onEdit ao clicar em Editar', async () => {
        const onEdit = vi.fn();

        render(
            <ActionsTable
                item={mockItem}
                getId={(item) => item.id}
                onEdit={onEdit}
            />
        );

        await openMenu();
        await userEvent.click(screen.getByText('Editar'));

        expect(onEdit).toHaveBeenCalledWith(mockItem);
    });

    test('executa onDelete ao clicar em Excluir', async () => {
        const onDelete = vi.fn();

        render(
            <ActionsTable
                item={mockItem}
                getId={(item) => item.id}
                onDelete={onDelete}
            />
        );

        await openMenu();
        await userEvent.click(screen.getByText('Excluir'));

        expect(onDelete).toHaveBeenCalledWith("1");
    });

    test('não renderiza botões se callbacks não forem passados', async () => {
        render(<ActionsTable item={mockItem} getId={(item) => item.id} />);

        await openMenu();

        expect(screen.queryByText('Editar')).not.toBeInTheDocument();
        expect(screen.queryByText('Excluir')).not.toBeInTheDocument();
    });
});
