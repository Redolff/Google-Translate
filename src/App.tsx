import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { FromLanguage, Language,  SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'

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

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if(debouncedFromText === '') return
    const sendMessageApi = async({ fromLanguage, toLanguage, debouncedFromText }: { fromLanguage: FromLanguage, toLanguage: Language, debouncedFromText: string }) => {
      const API = 'http://localhost:3001/api/cohere'
      try{
        const response = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fromLanguage, toLanguage, debouncedFromText })
        })

        if(!response.ok){
          throw new Error('Error response data')
        }
        const data = await response.json()
        setResult(data.result)
      }
      catch(e){
        setResult('Error message 404')
      }
    }

    sendMessageApi({fromLanguage, toLanguage, debouncedFromText})
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }
  
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
            <div style={{ position: 'relative' }}> 
              <TextArea 
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display:'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard} 
                >
                  <ClipboardIcon /> 
                </Button>
                <Button 
                  variant='link'
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>

      </Row>
    </Container>
  )
}

export default App
