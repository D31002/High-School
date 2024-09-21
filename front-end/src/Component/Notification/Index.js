import Swal from 'sweetalert2';
import styles from './customSwal.module.scss';

export const showSuccessMessage = (message) =>
    Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: message,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });

export const showErrorMessage = (message) =>
    Swal.fire({
        icon: 'error',
        title: 'Thất bại!',
        html: message,
        showConfirmButton: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });

export const showWarningMessage = (message) =>
    Swal.fire({
        icon: 'warning',
        title: 'Cảnh báo!',
        text: message,
        showConfirmButton: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
        },
    });

export const showBeforeSubmit = (message) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
    });

    return swalWithBootstrapButtons.fire({
        title: 'Bạn chắc chứ?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Chắc chắn',
        cancelButtonText: 'Không',
        reverseButtons: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
            confirmButton: styles['swal2-confirm'],
            cancelButton: styles['swal2-cancel'],
        },
    });
};

export const showBeforeDelete = (message) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
    });

    return swalWithBootstrapButtons.fire({
        title: 'Bạn chắc chứ?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Chắc chắn',
        cancelButtonText: 'Không',
        reverseButtons: true,
        customClass: {
            popup: styles.popup,
            title: styles.title,
            icon: styles.icon,
            confirmButton: styles['swal2-confirm'],
            cancelButton: styles['swal2-cancel'],
        },
    });
};
