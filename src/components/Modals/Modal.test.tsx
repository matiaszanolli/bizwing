// Modal Component Tests
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        title: 'Test Modal',
        children: <div>Modal Content</div>
    };

    it('should not render when isOpen is false', () => {
        const { container } = render(
            <Modal {...defaultProps} isOpen={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('should call onClose when clicking overlay', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);

        const overlay = document.querySelector('.modal-overlay');
        fireEvent.click(overlay!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when clicking modal content', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);

        const modalContent = document.querySelector('.modal-content');
        fireEvent.click(modalContent!);

        expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when clicking close button', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);

        const closeButton = document.querySelector('.modal-close');
        fireEvent.click(closeButton!);

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when pressing Escape key', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when pressing other keys', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);

        fireEvent.keyDown(document, { key: 'Enter' });

        expect(onClose).not.toHaveBeenCalled();
    });

    it('should apply normal size class by default', () => {
        render(<Modal {...defaultProps} />);

        const modalContent = document.querySelector('.modal-content');
        expect(modalContent).not.toHaveClass('modal-large');
        expect(modalContent).not.toHaveClass('modal-fullscreen');
    });

    it('should apply large size class when size is large', () => {
        render(<Modal {...defaultProps} size="large" />);

        const modalContent = document.querySelector('.modal-content');
        expect(modalContent).toHaveClass('modal-large');
    });

    it('should apply fullscreen size class when size is fullscreen', () => {
        render(<Modal {...defaultProps} size="fullscreen" />);

        const modalContent = document.querySelector('.modal-content');
        expect(modalContent).toHaveClass('modal-fullscreen');
    });

    it('should cleanup event listeners when unmounted', () => {
        const onClose = vi.fn();
        const { unmount } = render(<Modal {...defaultProps} onClose={onClose} />);

        unmount();

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).not.toHaveBeenCalled();
    });

    it('should not add event listeners when isOpen is false', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} isOpen={false} onClose={onClose} />);

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(onClose).not.toHaveBeenCalled();
    });
});
