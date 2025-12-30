import { AlertProps, Collapse, Alert as MuiAlert } from '@mui/material'

interface FormAlertProps extends AlertProps {
  message: string
  show: boolean
}

const FormAlert = ({ message, show, severity = 'error', ...props }: FormAlertProps) => (
  <Collapse in={show}>
    <MuiAlert severity={severity} sx={{ mb: 2 }} {...props}>
      {message}
    </MuiAlert>
  </Collapse>
)

export default FormAlert
