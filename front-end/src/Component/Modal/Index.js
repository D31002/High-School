import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Button from '../button/Button';

const cx = classNames.bind(styles);

function Index({
    title,
    children,
    save = false,
    edit = false,
    onClose,
    h300 = false,
    h400 = false,
    h500 = false,
    h600 = false,
    h700 = false,
    h800 = false,
    w300 = false,
    w400 = false,
    w500 = false,
    w600 = false,
    w700 = false,
    w800 = false,
    handleSubmitAdd,
    handleSubmitEdit,
    item3 = false,
    hidden = false,
    oneItem = false,
}) {
    const classNameModalContent = {
        h300,
        h400,
        h500,
        h600,
        h700,
        h800,
        w300,
        w400,
        w500,
        w600,
        w700,
        w800,
    };

    return (
        <div className={cx('Modal')}>
            <div className={cx('overlay')}></div>
            <div className={cx('modal-content', classNameModalContent)}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('content', { hidden: hidden })}>
                    {React.Children.map(children, (child, index) => (
                        <div className={cx('item', { item3, oneItem })} key={index}>
                            {child}
                        </div>
                    ))}
                </div>
                <div className={cx('button')}>
                    {save ? (
                        <Button btn onClick={handleSubmitAdd}>
                            Thêm
                        </Button>
                    ) : (
                        edit && (
                            <Button btn onClick={handleSubmitEdit}>
                                Lưu
                            </Button>
                        )
                    )}
                    <Button btn onClick={onClose}>
                        Thoát
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Index;
