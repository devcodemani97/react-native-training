import React from 'react';

import {
    TextInput,
    StyleSheet
} from 'react-native';

interface Props{
    secureTextEntry: boolean,
    placeholder: string;
    autofocus:boolean,
    val: string;
    setVal: (e: string)=> void;
}
const TextInputBox: React.FC<Props> = ({secureTextEntry, placeholder, val, setVal,autofocus}) => {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#000"
            secureTextEntry = {secureTextEntry}
            defaultValue=""
            value={val}
            autoFocus={autofocus}
            onChangeText={setVal}
            style={{
                height: 50,
                width:"90%",
                borderWidth: 1,
                borderRadius: 5,
                borderColor: "red",
                marginVertical: 10,
                fontFamily: 'Montserrat-Regular',
                fontSize: 20,
                letterSpacing: 2,
                lineHeight: 20
            }}
        />
    )
}

export default TextInputBox;
