import React, {useContext, useState} from "react"
import toast from "react-hot-toast"
import axios from "../../services/axios"
import {User} from "../../types/UserInterface"
import isEmail from 'validator/lib/isEmail';
import {useNavigate} from "react-router-dom"
import {Title, Button, Form, FormLink, Container, Dot, LoadingWrapper, ToastStyleError, ToastStyleSuccess} from "../../styles/GlobalStyles"
import LabelInput from "../../components/LabelInput"
import {ThemeContext} from "../../context/ThemeProvider"
import Loading from "../../components/Loading";

export default function Logon() {
  const {colorScheme} = useContext(ThemeContext);
  const [user, setUser] = useState<User>({username: '', email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate()

  const handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formError = false
    if (user.username?.length < 3 || user.username?.length > 255) {
      formError = true
      toast.error("Please provide a valid username (between 3 and 255 characters).",ToastStyleError(colorScheme))
    }
    if (user.password?.length < 6 || user.password?.length > 255) {
      formError = true
      toast.error("Please provide a valid password (between 6 and 255 characters).",ToastStyleError(colorScheme))
    }
    if (!isEmail(user.email)) {
      formError = true
      toast.error("Please provide a valid email.",ToastStyleError(colorScheme))
    }

    if (formError){
      return null
    }

      try {
        setLoading(true)
        const request = await axios.post("users", user)
        toast.success(request.data.message, ToastStyleSuccess(colorScheme))
        navigator("/login")
      } catch (e: any) {
        console.error(e.response.data.error)
        toast.error(e.response.data.error, ToastStyleError(colorScheme))
        return null;
      } finally {
        setLoading(false)
      }
  }
  return (
    <>
      <Title>{loading ? <Loading isLoading={loading}/> : 'Logon'}
      </Title>
      <Container colors={colorScheme}>
        <Form onSubmit={handleFormLogin} colors={colorScheme}>
          <LabelInput
            label="Username"
            colors={colorScheme}
            value={user.username}
            onChange={(e) => setUser({...user, username: e})}
          />
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

            <FormLink to="/login" colors={colorScheme}> click here to login! </FormLink>
          </p>
        </Form>
      </Container>
    </>
  )
}


