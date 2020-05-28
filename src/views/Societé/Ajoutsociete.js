import React, { Component } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import axios from "axios/index";

class Forms extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      adresse:"",
      tel:"",
      logo:"",
      date_cre:"",
      login:"",
      mp:"",


      loginErr: "",
      passwordErr: "",
      adresseErr:"",
      dateErr:"",

      erreur:false


    };
  }
//validation des champs
  validate = () => {

    let isError = false;

    const errors = {
      usernameErr: "",
      passwordErr: "",
      adresseErr:"",
      dateErr:"",
      telErr:""

    }




    const regex1=/^[a-zA-Z0-9._-]+$/;
    const regex2=/^[a-zA-Z]+$/;
    const regex3=/^[0-9-]+$/;
    const regex4=/^[0-9+]+$/;


    if ((this.state.login==="")||(this.state.login.length > 15)||!regex1.test(this.state.usename)) {

      isError = true;
      errors.usernameErr = "Veuillez verifier votre login";
    }
    if ((this.state.tel==="")||(this.state.tel.length > 15)||!regex4.test(this.state.tel)) {

      isError = true;
      errors.telErr = "Veuillez verifier votre numero téléphone";
    }


    if ((this.state.mp==="")||(this.state.mp.length > 20)) {

      isError = true;
      errors.passwordErr = "veuillez verifier votre mot de passe";
    }

    if ((this.state.date_cre==="")||(this.state.date_cre.length > 20)||!regex3.test(this.state.date_cre)) {

      isError = true;
      errors.dateErr = "veuillez verifier votre date";
    }
    if ((this.state.adresse==="")||(this.state.adresse.length > 20)||!regex2.test(this.state.adresse)) {

      isError = true;
      errors.adresseErr = "veuillez verifier votre adresse";
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

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }
  // supprimer valeur des input
  reset(){
    this.setState({login:"",
      mp:"",
    adresse:"",
    date_cre:"",
    logo:"",
    tel:""})
  }

  // submit
  handleSubmit(){
    let err=this.validate();
    if(!err){
      console.log("state",this.state.adresse)
      axios.post("http://localhost:8086/societe/add",{
        login:this.state.login,
        mp:this.state.mp,
        adresse:this.state.adresse,
        date_cre:this.state.date_cre,
        logo:this.state.logo,
        tel:this.state.tel,


      })
        .then(res=>{
          console.log("data",res.data)
          window.location.href="/#/home/category"
        })
    }


  }

  render() {
    return (
      <div className="animated fadeIn">

        <Row>

          <Col xs="12" md="12">

            <Card>
              <CardHeader>
                <strong>Ajout</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post">

                  <FormGroup>
                    <Label htmlFor="nf-email">Login</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"
                           value={this.state.login}
                      onChange={evt=>this.setState({login:evt.target.value})}/>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.usernameErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.usernameErr}</FormText>:null

                    }



                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">Mot de passe</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"value={this.state.mp}
                      onChange={evt=>this.setState({mp:evt.target.value})}/>

                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.passwordErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.passwordErr}</FormText>:null

                    }



                  </FormGroup>    <FormGroup>
                    <Label htmlFor="nf-email">Adresse</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"value={this.state.adresse}
                      onChange={evt=>this.setState({adresse:evt.target.value})}/>
                  {

                    this.state.erreur===false ?

                      <FormText >{this.state.adresseErr}</FormText>:null

                  }


                  {

                    this.state.erreur===true ?

                      <FormText style={{backgroundColor:"red"}} id="color12">{this.state.adresseErr}</FormText>:null

                  }





                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-password">Date creation</Label>
                    <Input type="date" id="nf-email" name="nf-email" placeholder="Enter date creation.."  autoComplete="email"value={this.state.date_cre}
                           onChange={evt=>this.setState({date_cre:evt.target.value})}/>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.dateErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.dateErr}</FormText>:null

                    }




                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="nf-email">logo</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter logo.." autoComplete="email"value={this.state.logo}
                           onChange={evt=>this.setState({logo:evt.target.value})}/>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="nf-email">tel</Label>
                    <Input type="text" id="nf-email" name="nf-email" placeholder="Enter tel.." autoComplete="email"value={this.state.tel}
                           onChange={evt=>this.setState({tel:evt.target.value})}/>
                    {

                      this.state.erreur===false ?

                        <FormText >{this.state.telErr}</FormText>:null

                    }


                    {

                      this.state.erreur===true ?

                        <FormText style={{backgroundColor:"red"}} id="color12">{this.state.telErr}</FormText>:null

                    }



                  </FormGroup>




                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                <Button type="reset" size="sm" color="danger" onClick={this.reset.bind(this)}><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>

          </Col>
        </Row>

      </div>
    );
  }
}

export default Forms;