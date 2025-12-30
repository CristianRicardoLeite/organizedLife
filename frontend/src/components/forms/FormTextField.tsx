import { TextField, TextFieldProps } from '@mui/material'

type FormTextFieldProps = TextFieldProps & {
  name: string
}

const FormTextField = ({ name, ...props }: FormTextFieldProps) => <TextField fullWidth variant="outlined" margin="normal" name={name} {...props} />

export default FormTextField
