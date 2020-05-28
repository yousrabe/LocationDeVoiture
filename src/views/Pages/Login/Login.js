import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button,FormText, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
class Login extends Component {
  constructor(){
    super();
    this.state={
      username:"",
      usernameErr:"",
      password:"",
      passwordErr:"",
      erreur:false

    }
  }
//validation des champs
  validate = () => {

    let isError = false;

    const errors = {
      usernameErr: "",
      passwordErr: "",
    }




    const regex1=/^[a-zA-Z0-9._-]+$/;


    if ((this.state.username==="")||(this.state.username.length > 15)||!regex1.test(this.state.usename)) {

      isError = true;
      errors.usernameErr = "Veuillez verifier votre login";
    }


    if ((this.state.password==="")||(this.state.password.length > 20)) {

      isError = true;
      errors.passwordErr = "veuillez verifier votre mot de passe";
    }



    if (isError) {
      this.setState({
        ...this.state,
        ...errors
      })
    }

    console.log("errrr ", isError)


    this.setState({
      erreur:isError
    })

    return isError;
  }


  login(){
    let err=this.validate();
    if(!err){
      console.log("state ",this.state)
      axios.post("http://localhost:8086/user/login",{
        login:this.state.username,
        mp:this.state.password
      })
        .then(res=>{
          if(res.data['data'] === null){
            alert("veifier votre login ou mot de passe")
          }
          else{
            alert("ok")
            window.location.href="/#/home/voiture"
          }
        })
    }


  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username"
                        value={this.state.username}
                        onChange={evt=>this.setState({username:evt.target.value})}/>


                        {

                          this.state.erreur===false ?

                            <FormText >{this.state.usernameErr}</FormText>:null

                        }


                        {

                          this.state.erreur===true ?

                            <FormText style={{backgroundColor:"red"}} id="color12">{this.state.usernameErr}</FormText>:null

                        }



                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" value={this.state.password}
                               onChange={evt=>this.setState({password:evt.target.value})}/>
                        {

                          this.state.erreur===false ?

                            <FormText >{this.state.passwordErr}</FormText>:null

                        }


                        {

                          this.state.erreur===true ?

                            <FormText style={{backgroundColor:"red"}} id="color12">{this.state.passwordErr}</FormText>:null

                        }




                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4"
                          onClick={this.login.bind(this)}>Login</Button>
                        </Col>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;