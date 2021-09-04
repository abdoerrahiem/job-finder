import { useFormikContext } from 'formik'
import Input from '../Input'
import ErrorMessage from './ErrorMessage'

const FormField = ({ name, width, error, clearError, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext()

  return (
    <>
      <Input
        onBlur={() => {
          setFieldTouched(name)
          if (error) {
            clearError()
          }
        }}
        onChangeText={(text) => {
          setFieldValue(name, text)
          if (error) {
            clearError()
          }
        }}
        value={values[name]}
        width={width}
        styleClass={`${touched[name] && errors[name] && 'border-error-color'} ${
          touched[name] && errors[name] && 'text-error-color'
        }`}
        {...otherProps}
      />
      {touched[name] && errors[name] && <ErrorMessage error={errors[name]} />}
      {error && <ErrorMessage error={error} />}
    </>
  )
}

export default FormField
