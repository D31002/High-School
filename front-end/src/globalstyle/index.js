import Styles from './globalstyle.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function Globalstyle({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Globalstyle;
