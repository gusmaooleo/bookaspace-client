import { Input, InputGroup, InputRightElement, SystemStyleObject } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './index.css'
import { ForwardedRef, useEffect, useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface CustomInputBoxProps {
  iconProp?: IconProp,
  placeholder: string,
  inputRef: ForwardedRef<HTMLInputElement>,
  type: string,
}

const CustomInputBoxComponent = ({ iconProp, placeholder, inputRef, type }: CustomInputBoxProps ) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show); 

  useEffect(() => {
    if (type === 'text') {
      setShow(true);
    }
  }, [])

  if (type === 'text') {
    return (
      <InputGroup>
        <Input
          // sx={inputStyleProps} 
          variant="light"
          placeholder={placeholder}
          ref={inputRef}
        />
        <InputRightElement>
          {iconProp !== undefined && <FontAwesomeIcon icon={iconProp} className='custom-color'/>}
        </InputRightElement> 
      </InputGroup>
    )
  } else {
    return (
      <InputGroup>
        <Input 
          // sx={inputStyleProps} 
          variant="light"
          placeholder={placeholder}
          ref={inputRef}
          type={show ? 'text' : 'password'}
        />
        <InputRightElement>
          {show ? <FontAwesomeIcon icon={faEyeSlash} className='custom-color' onClick={toggleShow}/> : <FontAwesomeIcon icon={faEye} className='custom-color' onClick={toggleShow}/>}
        </InputRightElement>
      </InputGroup>
    )
  }
}

export default CustomInputBoxComponent;

