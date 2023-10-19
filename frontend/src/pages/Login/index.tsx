import toast from "react-hot-toast"
import isEmail from 'validator/lib/isEmail';
import {useContext, useState} from "react"
import {useNavigate} from "react-router-dom";
import Loading from "../../components/Loading";
import {useDispatch} from "react-redux";
import LabelInput from "../../components/LabelInput"
import {ThemeContext} from "../../context/ThemeProvider"
import {User} from "../../types/UserInterface"
import {Button, Container, Form, FormLink, Title,  ToastStyleError} from "../../styles/GlobalStyles"
import * as action from '../../store/modules/user/actions'

export default function Login() {
  const dispatch = useDispatch()
  const {colorScheme} = useContext(ThemeContext)
  const [user, setUser] = useState<User>({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const navigator = useNavigate()

  const handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formError = false

    if (user.password?.length < 6 || user.password?.length > 255) {
      formError = true
      toast.error("Please provide a valid password (between 6 and 255 characters).", ToastStyleError(colorScheme))
    }
    if (!isEmail(user.email)) {
      formError = true
      toast.error("Please provide a valid email.", ToastStyleError(colorScheme))
    }

    if (formError) {
      return null
    } else {
      try{
        setLoading(true)
      dispatch(action.loginRequest({password: user.password, email: user.email, colorScheme: colorScheme, navigator: navigator}))
      }catch(e){
        console.error(e.message)
      }finally{
        setLoading(false)
      }

    }
  }
  return (
    <>
      <Title>{loading ?<Loading isLoading={loading}/>: 'Login'}
      </Title>
      <Container colors={colorScheme}>
        <Form onSubmit={handleFormLogin} colors={colorScheme}>
          <LabelInput
            label="Email"
            type="email"
            colors={colorScheme}
            value={user.email}
            onChange={e => setUser({...user, email: e})}
          />
          <LabelInput
            label="Password"
            type="password"
            colors={colorScheme}
            value={user.password}
            onChange={e => setUser({...user, password: e})}
          />

          <Button colors={colorScheme} type="submit">Login</Button>
          <p style={{
            margin: '10px'
          }}>
            Don't have an account yet?  <FormLink to="/logon" colors={colorScheme}> click here to create one! </FormLink>
          </p>
        </Form>
      </Container>
    </>
  )
}
