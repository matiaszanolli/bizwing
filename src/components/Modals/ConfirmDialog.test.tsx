// ConfirmDialog Component Tests
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onConfirm: vi.fn(),
        title: 'Confirm Action',
        message: 'Are you sure you want to proceed?'
    };

    it('should not render when isOpen is false', () => {
        const { container } = render(
            <ConfirmDialog {...defaultProps} isOpen={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render title and message when open', () => {
        render(<ConfirmDialog {...defaultProps} />);

        expect(screen.getByText('Confirm Action')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('should render Confirm and Cancel buttons', () => {
        render(<ConfirmDialog {...defaultProps} />);

        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should call onConfirm and onClose when Confirm is clicked', () => {
        const onConfirm = vi.fn();
        const onClose = vi.fn();
        render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} onClose={onClose} />);

        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);

        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Cancel is clicked', () => {
        const onConfirm = vi.fn();
        const onClose = vi.fn();
        render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} onClose={onClose} />);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(onConfirm).not.toHaveBeenCalled();
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should use custom button labels when provided', () => {
        render(
            <ConfirmDialog
                {...defaultProps}
                confirmText="Yes, Delete"
                cancelText="No, Keep It"
            />
        );

        expect(screen.getByText('Yes, Delete')).toBeInTheDocument();
        expect(screen.getByText('No, Keep It')).toBeInTheDocument();
    });

    it('should apply danger class when dangerous is true', () => {
        render(<ConfirmDialog {...defaultProps} dangerous={true} />);

        const confirmButton = screen.getByText('Confirm');
        expect(confirmButton).toHaveClass('btn-danger');
    });

    it('should apply primary class by default', () => {
        render(<ConfirmDialog {...defaultProps} />);

        const confirmButton = screen.getByText('Confirm');
        expect(confirmButton).toHaveClass('btn-primary');
    });
});
