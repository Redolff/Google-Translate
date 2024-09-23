import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'


const App = () => {
  const {
    setInterchangeLanguages,
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    fromText,
    setFromText,
    result,
    setResult,
    loading
  } = useStore()
  
  return (
    <Container fluid>
      <h1> Google Translate </h1>
      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs={'auto'}>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={setInterchangeLanguages}>
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea 
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
