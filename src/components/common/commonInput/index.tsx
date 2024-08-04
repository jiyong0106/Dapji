import styles from './commonInput.module.scss';
import classNames from 'classnames/bind';
import { UseFormRegisterReturn } from 'react-hook-form';

const cn = classNames.bind(styles);

type inputProps = {
  placeholder?: string;
  label?: string;
  id?: string;
  register?: UseFormRegisterReturn;
  suffix?: React.ReactNode;
  type: string;
};

const CommonInput = ({
  placeholder,
  label,
  id,
  suffix,
  register,
  type = 'text',
  ...rest
}: inputProps) => {
  return (
    <div className={cn('container')}>
      <label htmlFor={id}>{label}</label>
      <input
        className={cn('input')}
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        {...rest}
      />
      {suffix}
    </div>
  );
};

export default CommonInput;
