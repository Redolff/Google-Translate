import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'


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
    setResult
  } = useStore()
  
  return (
    <Container fluid>
      <h1> Google Translate </h1>
      <Row>

        <Col>
          <LanguageSelector 
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}
          />
        </Col>

        <Col>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={setInterchangeLanguages}>
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <LanguageSelector 
            type='to'
            value={toLanguage}
            onChange={setToLanguage}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
