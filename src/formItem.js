import React, { useRef, useEffect, createRef } from 'react';
import { setFormValue, useForm } from './index';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default ({ name, children, rule }) => {
  const dispatch = setFormValue();
  const ref = createRef();
  const labelRef = useRef();
  const form = useForm();
  const verify = (name, { rule }) => {
    switch (name) {
      case 'email':
        const email = form[name];
        if (email && !validateEmail(email)) {
        }
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (ref && ref.current) {
      ref?.current.classList.add('my-5');
      ref.current.onclick = () => {
        labelRef?.current?.setAttribute('data-type', 'float-it');
      };
      ref.current.onblur = (e) => {
        if (ref?.current?.value?.length) {
          // labelRef.current.removeAttribute('data-type');
        } else {
          labelRef?.current?.setAttribute('data-type', 'float');
        }

        if (rule?.require) {
          verify(name, rule);
        }
      };

      ref.current.onchange = (e) => dispatch({ type: name, value: e.target.value });
    }
  }, [ref]);

  return React.Children.map(children, (child) => (
    <span className="relative block">
      {child?.props?.label && (
        <label
          className="absolute"
          data-type={child?.props?.float && 'float'}
          htmlFor={child?.props?.name || ''}
          ref={labelRef}
        >
          {child?.props?.label}
        </label>
      )}
      {React.cloneElement(child, { ref })}
    </span>
  ));
};
