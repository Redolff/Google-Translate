import { Form } from "react-bootstrap"
import { SUPPORTED_LANGUAGES } from "../constants"
import { FromLanguage, Language } from "../types.d"

type Props = 
 | { type: 'from', value: FromLanguage, onChange: (language: FromLanguage) => void }
 | { type: 'to', value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ onChange }: Props ) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event?.target.value as Language)
    }

    return (
        <Form.Select aria-label='Seleccione el idioma' onChange={handleChange}>
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>
                    {literal}
                </option>
            ))}
        </Form.Select> 
    )
}